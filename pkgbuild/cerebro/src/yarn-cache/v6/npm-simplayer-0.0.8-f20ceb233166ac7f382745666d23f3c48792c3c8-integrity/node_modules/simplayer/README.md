
<p align="center">
  <img src="https://raw.githubusercontent.com/MaxMEllon/demos/master/simplayer/simplayer.png">
</p>


- - -

<p>
  <a href="https://www.npmjs.com/package/simplayer">
    <img src="https://nodei.co/npm/simplayer.png"/>
  </a>
  <a href="https://www.npmjs.com/package/simplayer">
    <img src="https://img.shields.io/npm/v/simplayer.svg" style="float:right;"/>
  </a>
  <a href="https://github.com/MaxMEllon/simplayer/blob/master/LICENSE.txt">
    <img src="https://img.shields.io/npm/l/simplayer.svg" style="float:right"/>
  </a>
</p>


## About

This is simple multi platform sound player.
I get ideas from [opener](https://www.npmjs.com/package/opener).

This module should be used when to play simple sound or sound effect.
Not suitable for music players.

## Installation

```sh
npm install simplayer -g

# if you want to use in node
npm install simplayer --save
```

If platform is linux, then need to install the `alsa`

```sh
# before we start the work, please update
sudo apt-get update
sudo apt-get upgrade

# install ALSA
sudo apt-get install alsa-base alsa-utils
```

## Usage

Simplayer function return child process instance.

```js

var simplayer = require('simplayer');

var musicProcess = simplayer('/path/to/sound.mp3');

var musicProcess = simplayer('path/to/song.mp3', function (error) {
  if (error) throw error;
  console.log('end of song!');
});

```

If platform is windows, then support wav file only.

```js

var musicProcess = simplayer('C:\\path\\to\\sound.wav');
// or
var musicProcess = simplayer('C:/path/to/sound.wav');

```

If handle to close event, Please, in the following manner.

```js

var simplayer = require('simplayer');

var musicProcess = simplayer('/path/to/sound.mp3');

musicProcess.on('close', function(code) {
  console.log('child process exited with code ' + code);
});

```

Use in the following manner in command line.

```sh

simplayer /path/to/sample.mp3

```

## For Japanese

- [http://qiita.com/maxmellon/items/afe7497ef3b4976ee87d](http://qiita.com/maxmellon/items/afe7497ef3b4976ee87d)

## Author

- Maxmellon

## LICENSE

MIT
