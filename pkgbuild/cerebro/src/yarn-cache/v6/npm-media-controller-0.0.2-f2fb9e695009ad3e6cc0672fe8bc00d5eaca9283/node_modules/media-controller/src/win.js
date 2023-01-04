const MediaController = require("bindings")("MediaController").MediaController
MediaController.prototype.setCurrentDuration = () => { }

module.exports = { MediaController }