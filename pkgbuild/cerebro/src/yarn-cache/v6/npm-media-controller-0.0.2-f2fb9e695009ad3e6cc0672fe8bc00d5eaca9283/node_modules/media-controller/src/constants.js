const ButtonEnum = {
  Play: 0,
  Pause: 1,
  Stop: 2,
  Record: 3,
  FastForward: 4,
  Rewind: 5,
  Next: 6,
  Previous: 7,
  ChannelUp: 8,
  ChannelDown: 9,
  Shuffle: 10,
  Repeat: 11,
  Seek: 12,
  PlayPause: 13
}

const PlaybackStateEnum = {
  Closed: 0,
  Changing: 1,
  Stopped: 2,
  Playing: 3,
  Paused: 4,
}

module.exports = { ButtonEnum, PlaybackStateEnum }