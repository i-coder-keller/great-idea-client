const { merge } = require('webpack-merge')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const config = require('./webpack.config')
module.exports = merge( config, {
  mode: 'production',
  optimization: {
    minimizer: [
      new CssMinimizerPlugin()
    ]
  },
  module: {
    rules: [
      {test: /.js$/i, use: ['babel-loader'], exclude: /node_modules/i},
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
        exclude: /node_modules/,
      },
    ]
  },
  plugins: [
    new CompressionPlugin()
  ]
})