const POSITION_UPDATE_INTERVAL = 500

export class PositionHolder {
  public position = 0
  private positionListener: ReturnType<typeof setInterval> | undefined
  private updateInterval: number
  public callback?: (time: number) => void

  constructor(updateInterval?: number) {
    this.updateInterval = updateInterval || POSITION_UPDATE_INTERVAL
  }

  public setListener() {
    this.clearListener()

    this.positionListener = setInterval(() => {
      this.position += this.updateInterval
      this.callback && this.callback(this.position)
    }, this.updateInterval)
  }

  public clearListener() {
    if (this.positionListener) {
      clearInterval(this.positionListener)
      this.positionListener = undefined
    }
  }
}
