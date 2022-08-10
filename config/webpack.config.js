
const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const EslintWebpackPlugin = require('eslint-webpack-plugin')
module.exports = {
  entry: './src/index.ts',
  output: {
    path: resolve(__dirname, '../dist'),
    filename: 'static/js/[name].[hash:8].js',
    publicPath: '/',
    clean: true
  },
  performance: { hints: false },
  module: {
    rules: [
      { test: /.less$/i, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'] },
      { test: /.css$/i, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] },
      { test: /\.(jpe?g|svg|png)$/, type: 'asset', generator: { filename: 'static/img/[name].[hash:6][ext]' }, parser: { dataUrlCondition: { maxSize: 10 * 1024 } } },
      { test: /\.(tff|woff|ttf)$/, type: "asset", generator: { filename: "static/fonts/[name].[hash:6][ext]", }, parser: { dataUrlCondition: { maxSize: 8 * 1024, }, }, },
      {test: /.vue$/i, use: ['vue-loader']},
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[hash:8].css',
    }),
    new VueLoaderPlugin(),
    new EslintWebpackPlugin({
      extensions: ['.js', '.vue', '.ts'],
      fix: true,
      failOnError: true,
      emitError: true,
      quiet: true,
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'THREE.js',
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.vue'],
    alias: {
      '@': resolve(__dirname, '../src'),
    }
  }
}