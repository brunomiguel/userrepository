# icns-convert

![badge](https://github.com/fiahfy/icns-convert/workflows/Node.js%20Package/badge.svg)

> Convert Image to [Apple Icon Image format](https://en.wikipedia.org/wiki/Apple_Icon_Image_format).

## Installation

```bash
npm install @fiahfy/icns-convert
```

## Usage

```js
import fs from 'fs'
import { convert } from '@fiahfy/icns-convert'

const buf = fs.readFileSync('input.png') // image must be squre, 1024x1024 pixels or larger
convert(buf).then((data) => {
  fs.writeFileSync('output.icns', data)
})
```

### Specify image for each size

```js
const bufs = [
  fs.readFileSync('16x16.png'),
  fs.readFileSync('32x32.png'),
  fs.readFileSync('64x64.png'),
  fs.readFileSync('128x128.png'),
  fs.readFileSync('256x256.png'),
  fs.readFileSync('512x512.png'),
  fs.readFileSync('1024x1024.png'),
]
convert(bufs).then((data) => {
  fs.writeFileSync('output.icns', data)
})
```

## CLI

```bash
npm install -g @fiahfy/icns-convert
icns-convert icon.png
```

or use via npx

```bash
npx @fiahfy/icns-convert icon.png
```
