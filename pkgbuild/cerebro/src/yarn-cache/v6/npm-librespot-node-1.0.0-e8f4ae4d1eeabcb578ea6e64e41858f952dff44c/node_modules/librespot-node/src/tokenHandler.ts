import assert from "assert"
import { PathLike } from "fs"
import { writeFile, readFile } from "fs/promises"
import { Token, TokenScope } from "./types"
import path from "path"

export class TokenHandler {
  private tokenMap: Token[] = []
  private filePath?: PathLike
  private readFilePromise: Promise<void>

  constructor(filePath?: string) {
    if (filePath) this.filePath = path.join(filePath, "tokens.json")
    this.readFilePromise = this.readFile()
  }

  private async dumpFile() {
    if (this.filePath)
      await writeFile(this.filePath, JSON.stringify(this.tokenMap))
  }

  private async readFile() {
    if (this.filePath)
      try {
        this.tokenMap = JSON.parse(
          await readFile(this.filePath, { encoding: "utf-8" })
        )
        assert(Array.isArray(this.tokenMap))
      } catch (e) {
        console.warn("Failed to parse token store, creating new")
        this.tokenMap = []
      }
  }

  public async addToken(token: Token) {
    await this.readFilePromise
    this.tokenMap.push(token)
    await this.dumpFile()
  }

  public async getToken(scopes: TokenScope[]) {
    await this.readFilePromise
    for (const token of this.tokenMap) {
      // Check if required scopes are already cached
      if (scopes.some((val) => token.scopes.includes(val))) {
        if (token.expiry_from_epoch > Date.now()) {
          // Check if the matching token is not expired
          return token
        }
      }
    }
  }
}
