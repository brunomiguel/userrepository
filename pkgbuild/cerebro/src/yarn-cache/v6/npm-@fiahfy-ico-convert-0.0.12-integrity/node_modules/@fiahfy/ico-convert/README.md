# ico-convert

![badge](https://github.com/fiahfy/ico-convert/workflows/Node.js%20Package/badge.svg)

> Convert Image to [ICO file format](<https://en.wikipedia.org/wiki/ICO_(file_format)>).

## Installation

```bash
npm install @fiahfy/ico-convert
```

## Usage

```js
import fs from 'fs'
import { convert } from '@fiahfy/ico-convert'

const buf = fs.readFileSync('input.png') // image must be squre, 256x256 pixels or larger
convert(buf).then((data) => {
  fs.writeFileSync('output.ico', data)
})
```

### Specify image for each size

```js
const bufs = [
  fs.readFileSync('16x16.png'),
  fs.readFileSync('24x24.png'),
  fs.readFileSync('32x32.png'),
  fs.readFileSync('48x48.png'),
  fs.readFileSync('64x64.png'),
  fs.readFileSync('128x128.png'),
  fs.readFileSync('256x256.png'),
]
convert(bufs).then((data) => {
  fs.writeFileSync('output.ico', data)
})
```

## CLI

```bash
npm install -g @fiahfy/ico-convert
ico-convert icon.png
```

or use via npx

```bash
npx @fiahfy/ico-convert icon.png
```
