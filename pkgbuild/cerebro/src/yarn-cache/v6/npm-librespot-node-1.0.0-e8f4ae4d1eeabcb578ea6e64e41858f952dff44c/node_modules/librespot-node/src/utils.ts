import https, { RequestOptions } from "https"
import { TokenScope } from "./types"

export const TRACK_REGEX = new RegExp(
  /^(?<urlType>(?:spotify:|(?:https?:\/\/(?:open|play)\.spotify\.com\/)))(?:embed)?\/?(?<type>album|track|playlist|artist)(?::|\/)((?:[0-9a-zA-Z]){22})/
)

export function request<T>(url: string, config: FetchConfig): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const parsedUrl = new URL(url)

    if (!config.headers) {
      config.headers = {}
    }

    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json"
    }

    if (config.body) {
      const bodyString =
        config.body instanceof Uint8Array
          ? config.body
          : JSON.stringify(config.body)
      config.headers["Content-Length"] = Buffer.byteLength(bodyString)
    }

    if (config.auth) {
      config.headers["Authorization"] = `Bearer ${config.auth}`
    }

    const options: RequestOptions = {
      host: parsedUrl.hostname,
      path: `${parsedUrl.pathname}${
        config.search ? `?${new URLSearchParams(config.search).toString()}` : ""
      }`,
      protocol: "https:",
      method: config.method,
      headers: config.headers,
    }
    let data = ""
    let req = https.request(options, (res) => {
      res.on("data", (chunk) => {
        data += chunk
      })

      res.on("end", () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode <= 299) {
          try {
            resolve(JSON.parse(data))
          } catch {
            resolve(data as T)
          }
        } else {
          reject(data)
        }
      })
    })

    req.on("error", reject)
    if (config.body) {
      const bodyString =
        config.body instanceof Uint8Array
          ? config.body
          : JSON.stringify(config.body)
      req.write(bodyString)
    }
    req.end()
  })
}

export const DEFAULT_SCOPES: TokenScope[] = [
  "playlist-read-collaborative",
  "user-follow-read",
  "user-library-read",
  "user-top-read",
  "user-read-recently-played",
  "user-modify-playback-state",
]

export const _librespotModule: LibrespotModule = require("librespot")
