const { ButtonEnum, PlaybackStateEnum } = require('./constants')

const Player = require("mpris-service")
const possibleLoopTypes = ['None', 'Track', 'Playlist']

class MediaController {
  player = undefined
  callbackMap = {}

  createPlayer (name) {
    this.player = Player({
      name: name ? name : "nodejs",
      identity: name ? name : "nodejs",
      supportedUriSchemes: ["file", "https", "http"],
      supportedMimeTypes: ["audio/*"],
      supportedInterfaces: ["player"],
    })
  }

  updatePlayerDetails (obj) {
    this.player.metadata = {
      "mpris:artUrl": obj.thumbnail,
      "xesam:title": obj.title,
      "xesam:album": obj.albumName,
      "xesam:artist": obj.artistName.split(","),
    }
  }

  setButtonStatus (obj) {
    const { play, pause, next, prev, seek, shuffle, loop } = obj

    if (play !== undefined) this.player.canPlay = !!play
    if (pause !== undefined) this.player.canPause = !!pause
    if (next !== undefined) this.player.canGoNext = !!next
    if (prev !== undefined) this.player.canGoPrevious = !!prev
    if (shuffle !== undefined) this.player.shuffle = !!shuffle
    if (loop !== undefined) this.player.loopStatus = possibleLoopTypes.includes(loop) ? loop : 'None'
  }

  setButtonPressCallback (callback) {
    for (const c in this.callbackMap) {
      this.player.removeListener(c, this.callbackMap[c])
    }

    this.callbackMap["next"] = this.player.on("next", () =>
      callback(ButtonEnum.Next)
    )
    this.callbackMap["previous"] = this.player.on("previous", () =>
      callback(ButtonEnum.Previous)
    )
    this.callbackMap["pause"] = this.player.on("pause", () =>
      callback(ButtonEnum.Pause)
    )
    this.callbackMap["play"] = this.player.on("play", () =>
      callback(ButtonEnum.Play)
    )
    this.callbackMap["stop"] = this.player.on("stop", () =>
      callback(ButtonEnum.Stop)
    )
    this.callbackMap["shuffle"] = this.player.on("shuffle", (arg) =>
      callback(ButtonEnum.Shuffle, arg)
    )
    this.callbackMap["loopStatus"] = this.player.on("loopStatus", (arg) =>
      callback(ButtonEnum.Repeat, arg)
    )
    this.callbackMap["seek"] = this.player.on("Seeked", (arg) => {
      callback(ButtonEnum.Seek, arg)
    })
    this.callbackMap["playpause"] = this.player.on("playpause", () => {
      callback(ButtonEnum.PlayPause)
    })
  }

  setPlaybackStatus (state) {
    if (state === PlaybackStateEnum.Playing) {
      this.player.playbackStatus = Player.PLAYBACK_STATUS_PLAYING
    } else if (state === PlaybackStateEnum.Paused) {
      this.player.playbackStatus = Player.PLAYBACK_STATUS_PAUSED
    } else if (state === PlaybackStateEnum.Stopped) {
      this.player.playbackStatus = Player.PLAYBACK_STATUS_STOPPED
    } else if (state === PlaybackStateEnum.Changing) {
      this.player.playbackStatus = Player.PLAYBACK_STATUS_PAUSED
    } else if (state === PlaybackStateEnum.Closed) {
      this.player.playbackStatus = Player.PLAYBACK_STATUS_STOPPED
    }
  }

  getPlayer () {
    return this.player.name
  }
}

module.exports = { MediaController }