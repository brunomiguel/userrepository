<!-- markdownlint-disable MD024 -->

# ico

![badge](https://github.com/fiahfy/ico/workflows/Node.js%20Package/badge.svg)

> [ICO file format](<https://en.wikipedia.org/wiki/ICO_(file_format)>) parser and builder.

## Installation

```bash
npm install @fiahfy/ico
```

## Usage

### Parsing

```js
import fs from 'fs'
import { Ico } from '@fiahfy/ico'

const buf = fs.readFileSync('icon.ico')
const ico = Ico.from(buf)
console.log(ico.fileHeader) // IcoFileHeader { reserved: 0, type: 1, count: 7 }
console.log(ico.infoHeaders[0]) // IcoInfoHeader { width: 16, height: 16, ... }
```

### Building

```js
import fs from 'fs'
import { Ico, IcoImage } from '@fiahfy/ico'

const ico = new Ico()
let buf

buf = fs.readFileSync('128x128.png')
image = IcoImage.fromPNG(buf)
ico.append(image)

buf = fs.readFileSync('256x256.png')
image = IcoImage.fromPNG(buf)
ico.append(image)

/* Some other PNG files */

fs.writeFileSync('icon.ico', ico.data)
```

## API

### Class: Ico

#### static from(buffer)

Create ICO from the icon buffer.

##### buffer

Type: `Buffer`

The ICO icon buffer.

#### append(image)

Adds ICO image at the end.

##### image

Type: `IcoImage`

The ICO Image to append.

#### insert(image, index)

Inserts ICO image at the specified position.

##### image

Type: `IcoImage`

The ICO Image to insert.

##### index

Type: `number`

The position at which to insert the ICO Image.

#### remove(index)

Removes ICO image at the specified position.

##### index

Type: `number`

The position of the ICO Image to remove.

#### fileHeader

Type: `IcoFileHeader`

Return the file header on the ICO.

#### infoHeaders

Type: `IcoInfoHeader[]`

Return the ICO info header on the ICO.

#### images

Type: `IcoImage[]`

Return the ICO images on the ICO.

#### data

Type: `Buffer`

Return the ICO buffer.

### Class: IcoImage

#### static from(buffer)

Create ICO image from the buffer.

##### buffer

Type: `Buffer`

The ICO image buffer.

#### static fromPNG(buffer)

Create ICO Image from the PNG image buffer.

##### buffer

Type: `Buffer`

The PNG image buffer.

### Class: IcoInfoHeader

#### static from(buffer)

Create ICO info header from the buffer.

##### buffer

Type: `Buffer`

The ICO info header buffer.

### Class: IcoFileHeader

#### static from(buffer)

Create ICO file header from the buffer.

##### buffer

Type: `Buffer`

The ICO file header buffer.

## Specifications

### Supported Size

| Size    |
| ------- |
| 16x16   |
| 24x24   |
| 32x32   |
| 48x48   |
| 64x64   |
| 128x128 |
| 256x256 |
