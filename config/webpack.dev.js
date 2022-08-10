const { merge } = require('webpack-merge')
const config = require('./webpack.config')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = merge(config, {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {test: /.ts$/i, use: [{loader: 'ts-loader', options: { appendTsSuffixTo: [/\.vue$/], transpileOnly: true, logInfoToStdOut: true, logLevel: 'error'}}], exclude: /node_modules/i},
    ]
  },
  devServer: {
    port: 9000,
    compress: true,
    open: true,
    client: {
      logging: 'error',
      overlay: {
        errors: true,
        warnings: true,
      },
    },
    watchFiles: ['src/**/*.vue', 'public/**/*', 'src/**/*.ts'],
    hot: true,
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
  ]
})