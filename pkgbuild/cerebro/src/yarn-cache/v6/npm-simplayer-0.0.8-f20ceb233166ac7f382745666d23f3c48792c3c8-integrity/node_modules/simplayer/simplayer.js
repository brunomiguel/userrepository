#!/usr/bin/env node

'use strict';

var childProcess = require('child_process');

/**
 * play
 * To run the process to match the platform.
 * @param {string} filepath
 * @param {function} callback
 * @return {Object} childProcess
 */
function play(filepath, callback) {
  var mediaSoundPlayer = '"(New-Object System.Media.SoundPlayer "' + filepath + '").PlaySync()';
  var player = process.platform === 'darwin' ? 'afplay' : 'aplay';

  if (typeof filepath === 'string') {
    filepath = [filepath];
  }

  if (! callback) {
    callback = function(error) {
      if (error) throw error;
    }
  }

  return process.platform === 'win32'
    ? childProcess.exec('powershell.exe ' + mediaSoundPlayer, callback)
    : childProcess.execFile(player, filepath, callback);
}

module.exports = play;

if (require.main && require.main.id === module.id) {
  play(process.argv.slice(2));
}
