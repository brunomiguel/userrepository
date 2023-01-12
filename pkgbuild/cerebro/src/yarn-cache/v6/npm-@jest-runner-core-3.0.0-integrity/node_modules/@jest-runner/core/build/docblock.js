'use strict';

var _fs = require('fs');
var _fs2 = _interopRequireDefault(_fs);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

class Docblock {
  static fromFile(filePath) {
    const content = _fs2.default.readFileSync(filePath, 'utf8');
    return new Docblock(content);
  }

  constructor(code) {
    _defineProperty(this, '_code', void 0);
    _defineProperty(this, '_nodes', void 0);
    _defineProperty(this, '_restOfTheFile', void 0);
    _defineProperty(this, '_originalDocblock', void 0);
    _defineProperty(this, '_docblock', void 0);
    this._code = code;
    const {nodes, restOfTheFile, docblock, originalDocblock} = Docblock.parse(
      code
    );

    this._nodes = nodes;
    this._restOfTheFile = restOfTheFile;
    this._docblock = docblock;
    this._originalDocblock = originalDocblock;
  }

  getCode() {
    return this._code;
  }

  printFileContent() {
    const docblock = this.printDocblock();
    const restOfTheFile = this._restOfTheFile.replace(/^\s+/g, '');
    const separator = docblock ? '\n\n' : '';
    return docblock + separator + restOfTheFile;
  }

  printDocblock() {
    if (!this._nodes.length) {
      return '';
    }

    const content = this._nodes.map(node => {
      switch (node.type) {
        case 'directive': {
          const value = node.value
            .split('\n')
            .map((line, index) =>
              // If it's a multiline directive we force add indentation for
              // other lines if there isn't any already.
              index > 0 && !line.match(/^\s+/) ? `  ${line}` : line
            )
            .join('\n * ');
          return ` * @${node.name}${value ? ' ' + value : ''}`;
        }
        case 'comment': {
          return ` *${node.value ? ' ' + node.value : ''}`;
        }
        default:
          throw new Error(`unrecognized type ${node.type}`);
      }
    });

    return '/**\n' + content.join('\n') + '\n */';
  }

  setDirective(name, value = '') {
    const existingDirective = this._nodes.find(
      node => node.type === 'directive' && node.name === name
    );

    existingDirective
      ? (existingDirective.value = value)
      : this.addAfterExistingDirective({
          name,
          type: 'directive',
          value
        });
  }

  // Add a new directive next to the last directive in the docblock,
  // or as the last line if no directives present.
  addAfterExistingDirective(node) {
    let lastIndexOfDirectiveNode = -1;
    this._nodes.forEach((node, index) => {
      node.type === 'directive' && (lastIndexOfDirectiveNode = index);
    });

    lastIndexOfDirectiveNode === -1
      ? this._nodes.push(node)
      : this._nodes.splice(lastIndexOfDirectiveNode + 1, 0, node);
  }

  deleteDirective(name) {
    // $FlowFixMe flow does not support filtering
    this._nodes = this._nodes.filter(node => node.name !== name);
  }

  getDirectives() {
    return this._nodes
      .filter(node => node.type === 'directive')
      .reduce((directives, node) => {
        // $FlowFixMe filter
        const nodeName = node.name;
        // If any of the directives repeat, we'll make an array of all
        // values that have the same key (directive)
        if (directives.hasOwnProperty(nodeName)) {
          Array.isArray(directives[nodeName])
            ? directives[nodeName].push(node.value)
            : (directives[nodeName] = [directives[nodeName], node.value]);
        } else {
          directives[nodeName] = node.value;
        }
        return directives;
      }, {});
  }

  static parse(code) {
    const DOCBLOCK_RE = /^(\s*)(\/\*\*?(.|\r?\n)*?\*\/)/;

    const docblockMatch = code.match(DOCBLOCK_RE);
    const originalDocblock = docblockMatch ? docblockMatch[0] || '' : '';
    const restOfTheFile = docblockMatch
      ? code.slice(docblockMatch.index + docblockMatch[0].length, code.length)
      : code;

    // only text, without `*` or `/**` or `*/`
    const docblock = originalDocblock
      .trim()
      // leading ` /**` or ` /*`
      .replace(/^\s*\/\*\*? */g, '')
      // leading ` * ` in ` * Some content`
      .replace(/^\s+\*\/? ?/gm, '')
      .replace(/\*\/$/, '')
      .trim();

    const nodes = docblock ? Docblock._parseNodes(docblock) : [];

    return {
      docblock,
      nodes,
      originalDocblock,
      restOfTheFile
    };
  }

  static _parseNodes(docblock) {
    const nodes = [];

    for (const line of docblock.trim().split('\n')) {
      const matchDirective = line.match(/^\s*@([\w-]+)/);

      // It it starts from `@` we always assume that this is a new directive
      if (matchDirective) {
        const name = matchDirective[1];
        // THIS WONT WORK if theres a leading space
        const value = line
          // $FlowFixMe match object is weird
          .slice(matchDirective.index + matchDirective[0].length, line.length)
          .trim();
        nodes.push({
          name,
          type: 'directive',
          value
        });
      } else if (
        // if the previous node was a directive and the next line is indented,
        // we assume that this is a multiline directive declaration.
        nodes.length &&
        nodes[nodes.length - 1].type === 'directive' &&
        line.match(/^\s+/)
      ) {
        nodes[nodes.length - 1].value += '\n' + line;
      } else {
        nodes.push({
          type: 'comment',
          value: line
        });
      }
    }

    return nodes;
  }
}

module.exports = Docblock;
