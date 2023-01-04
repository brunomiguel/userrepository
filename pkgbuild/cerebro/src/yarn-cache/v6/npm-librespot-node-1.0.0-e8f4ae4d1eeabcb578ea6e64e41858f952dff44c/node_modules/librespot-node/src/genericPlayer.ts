import EventEmitter from "events"
import { TokenHandler } from "./tokenHandler"
import { PositionHolder } from "./positionHolder"
import {
  ConstructorConfig,
  Token,
  CanvazResponse,
  LyricsResponse,
} from "./types"
import { PlayerEvent, PlayerEventTypes, TokenScope } from "./types"
import { TRACK_REGEX, _librespotModule } from "./utils"

export function safe_execution(
  _: unknown,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<any>
) {
  const originalMethod = descriptor.value

  descriptor.value = function (...args: unknown[]) {
    if ((this as GenericPlayer).isInitialized) {
      return originalMethod.call(this, ...args)
    } else {
      throw new Error(
        `Cannot call method ${propertyKey} before player has initialized`
      )
    }
  }

  return descriptor
}

export abstract class GenericPlayer {
  protected tokenHandler: TokenHandler
  protected _positionHolder: PositionHolder
  public eventEmitter = new EventEmitter()

  protected playerInstance: PlayerNativeObject | undefined

  protected _volume = 0

  protected device_id!: string

  protected _isInitialized = false

  public get isInitialized() {
    return this._isInitialized
  }

  protected abstract onPlayerInitialized(): void

  private validateConfig(config: ConstructorConfig): FullConstructorConfig {
    if (!config.auth) {
      throw new Error("missing auth details from config")
    }

    if (!config.auth.username || !config.auth.password) {
      throw new Error("missing username or password from config")
    }

    config.auth.authType = config.auth.authType ?? "AUTHENTICATION_USER_PASS"

    config.backend = config.backend ?? ""
    config.bitrate = config.bitrate ?? "320"
    config.gapless = config.gapless ?? false
    config.passThrough = config.passThrough ?? false

    config.connectConfig = {
      deviceType: config.connectConfig?.deviceType ?? "computer",
      hasVolumeControl: config.connectConfig?.hasVolumeControl ?? true,
      initialVolume: config.connectConfig?.initialVolume ?? 32768,
      name: config.connectConfig?.name ?? "librespot",
    }

    config.normalizationConfig = {
      normalization: config.normalizationConfig?.normalization ?? false,
      normalizationType:
        config.normalizationConfig?.normalizationType ?? "auto",
      normalizationMethod:
        config.normalizationConfig?.normalizationMethod ?? "basic",
      normalizationAttackCF:
        config.normalizationConfig?.normalizationAttackCF ?? 0,
      normalizationKneeDB: config.normalizationConfig?.normalizationKneeDB ?? 0,
      normalizationPregain:
        config.normalizationConfig?.normalizationPregain ?? 0,
      normalizationReleaseCF:
        config.normalizationConfig?.normalizationReleaseCF ?? 0,
      normalizationThreshold:
        config.normalizationConfig?.normalizationThreshold ?? 0,
    }

    config.cache = {
      audio_location: config.cache?.audio_location,
      credentials_location: config.cache?.credentials_location,
      volume_location: config.cache?.audio_location,
      size_limiter: config.cache?.size_limiter,
    }

    config.pos_update_interval = config.pos_update_interval ?? 500

    return config as FullConstructorConfig
  }

  constructor(
    config: ConstructorConfig,
    playerConstructMethod:
      | "create_player"
      | "create_player_spirc" = "create_player"
  ) {
    let validatedConfig = this.validateConfig(config)
    this.tokenHandler = new TokenHandler(
      validatedConfig.cache?.credentials_location
    )
    this._positionHolder = new PositionHolder(config.pos_update_interval)

    _librespotModule[playerConstructMethod](
      validatedConfig,
      this.player_event_callback.bind(this)
    )
      .then((val) => {
        this.playerInstance = val

        this.onPlayerInitialized()
        this.registerListeners()
        this._isInitialized = true
        this.eventEmitter.emit("PlayerInitialized", {
          event: "PlayerInitialized",
        })
      })
      .catch((e) => {
        this.eventEmitter.emit("InitializationError", {
          event: "InitializationError",
          error: e,
        })
      })

    this._positionHolder.callback = (position_ms) => {
      this.eventEmitter.emit("TimeUpdated", {
        event: "TimeUpdated",
        position_ms,
      })
    }
  }

  private player_event_callback(event: PlayerEvent) {
    this.eventEmitter.emit(event.event, event)
  }

  private registerListeners() {
    this.addListener("VolumeChanged", (event) => {
      this._volume = event.volume
    })

    this.addListener("Playing", (e) => {
      this._positionHolder.setListener()
      this._positionHolder.position = e.position_ms
    })

    this.addListener("Paused", (e) => {
      this._positionHolder.clearListener()
      this._positionHolder.position = e.position_ms
    })

    this.addListener("Stopped", (e) => {
      this._positionHolder.clearListener()
      this._positionHolder.position = 0
    })

    this.addListener("PositionCorrection", (e) => {
      this._positionHolder.position = e.position_ms
    })

    this.addListener("Seeked", (e) => {
      this._positionHolder.position = e.position_ms
    })

    this.addListener("TrackChanged", () => {
      this._positionHolder.clearListener()
      this._positionHolder.position = 0
    })
  }

  public on = this.addListener
  public off = this.removeListener

  public addListener<T extends PlayerEventTypes>(
    event: T,
    callback: (event: PlayerEvent<T>) => void
  ) {
    return this.eventEmitter.addListener(event, callback)
  }

  public removeListener<T extends PlayerEventTypes>(
    event: T,
    callback: (event: PlayerEvent<T>) => void
  ) {
    return this.eventEmitter.removeListener(event, callback)
  }

  public once<T extends PlayerEventTypes>(
    event: T,
    callback: (event: PlayerEvent<T>) => void
  ) {
    return this.eventEmitter.once(event, callback)
  }

  public removeAllListeners() {
    this.eventEmitter.removeAllListeners()
    this.registerListeners()
  }

  public getDeviceId() {
    return this.device_id
  }

  protected validateUri(val: string): [string | undefined, string | undefined] {
    const match = val.match(TRACK_REGEX)

    if (match?.groups?.type) {
      if (match.groups.urlType?.startsWith("https")) {
        const parsedUrl = new URL(val)
        return [
          `spotify:${match.groups.type}:${parsedUrl.pathname
            .split("/")
            .at(-1)}`,
          match.groups.type,
        ]
      }
      return [val, match.groups.type]
    }

    return [undefined, undefined]
  }

  public abstract setVolume(volume: number, raw?: boolean): Promise<void>
  public abstract load(
    trackURIs: string | string[],
    autoPlay?: boolean,
    startPosition?: number
  ): Promise<void>
  public abstract getToken(...scopes: TokenScope[]): Promise<Token | undefined>
  public abstract getVolume(raw?: boolean): number
  public abstract seek(posMs: number): Promise<void>
  public abstract close(): Promise<void>
  public abstract getCurrentPosition(): number
  public abstract getCanvas(track: string): Promise<CanvazResponse | undefined>
  public abstract getLyrics(track: string): Promise<LyricsResponse | undefined>
}
