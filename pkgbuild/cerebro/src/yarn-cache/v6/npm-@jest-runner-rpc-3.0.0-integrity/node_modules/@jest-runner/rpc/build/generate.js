'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
exports.prepareFiles = exports.generate = undefined;

var _crypto = require('crypto');
var _crypto2 = _interopRequireDefault(_crypto);
var _docblock = require('@jest-runner/core/docblock');
var _docblock2 = _interopRequireDefault(_docblock);
var _fs = require('fs');
var _fs2 = _interopRequireDefault(_fs);
var _glob = require('glob');
var _glob2 = _interopRequireDefault(_glob);
var _jscodeshift = require('jscodeshift');
var _jscodeshift2 = _interopRequireDefault(_jscodeshift);
var _path = require('path');
var _path2 = _interopRequireDefault(_path);
var _prettier = require('prettier');
var _prettier2 = _interopRequireDefault(_prettier);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */ const DEFAULT_RPC_PROCESS_PATH = '@jest-runner/rpc/RPCProcess';

const generate = (exports.generate = async options => {
  const files = await prepareFiles(options);
  files.forEach(([filePath, source]) => {
    _fs2.default.writeFileSync(filePath, source);
    // eslint-disable-next-line no-console
    console.log(`write: ${filePath}`);
  });
});

const prepareFiles = (exports.prepareFiles = async ({
  globs,
  RPCProcessPath = DEFAULT_RPC_PROCESS_PATH
}) => {
  const files = globs.reduce(
    (files, glob) => files.concat(_glob2.default.sync(glob)),
    []
  );

  return Promise.all(
    files.map(async file => {
      // eslint-disable-next-line no-console
      console.log(`generating: ${file}`);
      if (!file.match(/\.js$/)) {
        throw new Error(
          `RPC definitions must be '.js' files. filename: ${file}`
        );
      }
      const source = _fs2.default.readFileSync(file, 'utf8');
      const ast = _jscodeshift2.default.withParser('flow')(source);
      const moduleExports = ast
        .find(_jscodeshift2.default.AssignmentExpression, {
          left: {
            type: 'MemberExpression',
            property: {type: 'Identifier', name: 'exports'},
            object: {type: 'Identifier', name: 'module'}
          }
        })
        .nodes();

      validateExports(moduleExports);

      const propNames = moduleExports[0].right.properties.map(
        prop => prop.key.name
      );

      const {fileName, className} = makeGeneratedFilename(file);
      return [
        fileName,
        await codeGen({
          file,
          generatedFile: fileName,
          propNames,
          className,
          RPCProcessPath
        })
      ];
    })
  );
});

const makeGeneratedFilename = filePath => {
  const basename = _path2.default.basename(filePath, '.js');
  const dirname = _path2.default.dirname(filePath);
  const fileName = _path2.default.join(
    dirname,
    `${basename}Process.generated.js`
  );
  const className = `${basename}Process`;
  return {fileName, className};
};

const codeGen = async ({
  propNames,
  file,
  generatedFile,
  RPCProcessPath,
  className
}) => {
  const lines = [
    '/**',
    ' * ****************************************************',
    ' * THIS IS A GENERATED FILE. DO NOT MODIFY IT MANUALLY!',
    ' * ****************************************************',
    ' */',
    '',
    `import typeof Methods from '${relativePath(generatedFile, file)}'`,
    `import RPCProcess from '${
      RPCProcessPath === DEFAULT_RPC_PROCESS_PATH
        ? RPCProcessPath
        : relativePath(generatedFile, RPCProcessPath)
    }';`,
    ''
  ];

  lines.push('');
  lines.push(`class ${className} extends RPCProcess<Methods> {`);
  lines.push('  initializeRemote(): Methods {');
  lines.push('    return {');
  for (const propName of propNames) {
    lines.push(
      `      '${propName}': (this.jsonRPCCall.bind(this, '${propName}'): any),`
    );
  }
  lines.push('    };');
  lines.push('  };');
  lines.push('}');
  lines.push(`module.exports = ${className};`);

  const code = await prettify(generatedFile, lines.join('\n'));
  const docblock = new _docblock2.default(code);

  const signed = _crypto2.default
    .createHash('md5')
    .update(docblock.getCode())
    .digest('hex');

  docblock.setDirective('flow');
  docblock.setDirective('generated', signed);

  return docblock.printFileContent();
};

const validateExports = nodes => {
  if (!nodes.length) {
    throw new Error(
      `RPC definition file should have a "module.exports = " assignment`
    );
  }

  const exported = nodes[0].right;

  if (exported.type !== 'ObjectExpression') {
    throw new Error(`RPC definition file must export an object`);
  }

  const properties = exported.properties;

  const errorMessages = properties.reduce((errors, property) => {
    if (!property.method) {
      errors.push(`
      RPC definition must export an object where properties can only be methods.

      property: ${JSON.stringify(property.key)}

      e.g.:
        module.exports = {
          test(a: number): Promise<number> {
              return Promise.resolve(1)
          }
        }
        `);
    }

    if (!property.value.returnType) {
      errors.push(`
      RPC definition properties must have return value type annotation.

      property: ${JSON.stringify(property.key)}
      `);
    }

    if (
      !(
        property.value.returnType.typeAnnotation.id.type === 'Identifier' &&
        property.value.returnType.typeAnnotation.id.name === 'Promise'
      )
    ) {
      errors.push(`
        RPC definition properties must have a return type of Promise.

        property: ${JSON.stringify(property.key)}
        `);
    }
    return errors;
  }, []);

  if (errorMessages.length) {
    throw new Error(errorMessages.join('\n'));
  }
};

const relativePath = (from, to) => {
  let rel = _path2.default.relative(_path2.default.dirname(from), to);
  if (!rel.match(/^\./)) {
    rel = './' + rel;
  }

  return rel;
};

const prettify = async (generatedFile, code) => {
  const config = await _prettier2.default.resolveConfig(generatedFile);
  return _prettier2.default.format(code, config);
};
