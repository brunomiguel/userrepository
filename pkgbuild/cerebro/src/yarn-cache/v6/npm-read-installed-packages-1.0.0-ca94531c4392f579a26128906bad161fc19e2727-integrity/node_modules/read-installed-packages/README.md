# read-installed-packages

Read all the installed packages in a folder, and return a tree
structure with all the data.

It is a maintained fork of [read-packages]()

## Usage

```javascript
var readInstalled = require("read-installed-packages")
// optional options
var options = { dev: false, log: fn, depth: 2 }
readInstalled(folder, options, function (er, data) {
  ...
})
```
