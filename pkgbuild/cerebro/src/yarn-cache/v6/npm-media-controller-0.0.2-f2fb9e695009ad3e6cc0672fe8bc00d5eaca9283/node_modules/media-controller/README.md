# MediaController

This package provides a simple way to control MPRIS (Linux) and Windows system media controls (using WinRT).

Works with Electron

## How to use

### Install the package
```bash
yarn add https://github.com/Moosync/MediaController.git 
```

### Create a player
```js
const mediaController = require('media-controller')
mediaController.createPlayer('my player')
```

## Methods
#### updatePlayerDetails
To set media info to controls, use
```js
mediaController.updatePlayerDetails({
  title: 'End of Time',
  albumName: 'End of Time',
  artistName: 'Alan Walker, Ahrix, K-391',
  genres: ['Electronic'],
  thumbnail: '<absolute_path_to_image>'
})
```

#### setButtonStatus
You can set the status of buttons available
```js
mediaController.setButtonStatus({
  play: true,
  pause: true,
  next: true,
  prev: true,
  seek: false,
  shuffle: false,
  loop: 'Track' // Possible values "None" | "Track" | "Playlist"
})
```

#### setButtonPressCallback
Callback to fire when a button is pressed on media controls. For button constants, see [constants.js](./src/constsnts.js)
```js
const ButtonEnum = require('media-controller').ButtonEnum

mediaController.setButtonPressCallback((button) => {
  if (button === ButtonEnum.Play) {
    // handle play 
  } else if (button === ButtonEnum.Next) {
    // handle next
  }
})
```

#### setPlaybackStatus
Set the playback status of player to Playing, Paused, Stopped, Changing or Closed
```js
const PlaybackStateEnum = require('media-controller').PlaybackStateEnum
mediaController.setPlaybackStatus(PlaybackStateEnum.Playing)
```

#### setCurrentDuration (Linux only)
Set the current duration of player. (Useful when the user manually seeks and the duration is to be updated)
```js
mediaController.setCurrentDuration(80) // In seconds
```
