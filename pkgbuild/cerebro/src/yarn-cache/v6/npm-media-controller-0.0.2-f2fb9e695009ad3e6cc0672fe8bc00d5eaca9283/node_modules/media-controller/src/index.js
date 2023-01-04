const { ButtonEnum, PlaybackStateEnum } = require('./constants')

if (process.platform === "win32") {
  module.exports = new (require('./win').MediaController)()
} else if (process.platform === "linux") {
  module.exports = new (require('./linux').MediaController)()
} else {
  module.exports = new (require('./dummy').MediaController)()
}

module.exports.ButtonEnum = ButtonEnum
module.exports.PlaybackStateEnum = PlaybackStateEnum



