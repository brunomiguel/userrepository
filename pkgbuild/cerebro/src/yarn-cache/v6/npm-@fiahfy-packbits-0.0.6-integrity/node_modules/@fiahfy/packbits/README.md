<!-- markdownlint-disable MD024 -->

# packbits

![badge](https://github.com/fiahfy/packbits/workflows/Node.js%20Package/badge.svg)

> [PackBits](https://en.wikipedia.org/wiki/PackBits) implementation in JavaScript.

## Installation

```bash
npm install @fiahfy/packbits
```

## Usage

### Default

#### Encoding

```js
import { encode } from '@fiahfy/packbits'

console.log(buf) // <Buffer aa bb bb cc cc cc dd dd dd dd>
const encoded = encode(buf)
console.log(encoded) // <Buffer 00 aa ff bb fe cc fd dd>
```

#### Decoding

```js
import { decode } from '@fiahfy/packbits'

console.log(buf) // <Buffer 00 aa ff bb fe cc fd dd>
const decoded = decode(buf)
console.log(decoded) // <Buffer aa bb bb cc cc cc dd dd dd dd>
```

### ICNS format

In [Apple Icon Image format](https://en.wikipedia.org/wiki/Apple_Icon_Image_format), pixel data are often compressed (per channel) with a format similar to PackBits.

#### Encoding

```js
import { encode } from '@fiahfy/packbits'

console.log(buf) // <Buffer aa bb bb cc cc cc dd dd dd dd>
const encoded = encode(buf, { format: 'icns' })
console.log(encoded) // <Buffer 02 aa bb bb 80 cc 81 dd>
```

#### Decoding

```js
import { decode } from '@fiahfy/packbits'

console.log(buf) // <Buffer 02 aa bb bb 80 cc 81 dd>
const decoded = decode(buf, { format: 'icns' })
console.log(decoded) // <Buffer aa bb bb cc cc cc dd dd dd dd>
```
