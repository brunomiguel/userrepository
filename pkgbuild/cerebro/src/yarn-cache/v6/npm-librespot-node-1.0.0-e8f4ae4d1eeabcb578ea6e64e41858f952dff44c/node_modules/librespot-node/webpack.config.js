const path = require('path');
const mode = 'production'

module.exports = {
  entry: './src/index.ts',
  target: "node",
  mode,
  devtool: mode === 'development' ? 'source-map' : undefined,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  externals: [{ 'librespot': './build/librespot.node' }],
  module: {
    rules: [
      {
        use: 'ts-loader',
        test: /\.ts?$/
      }
    ]
  },
}