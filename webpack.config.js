var webpack = require('webpack')
var path = require('path')

module.exports = {
  // 页面入口文件配置
  entry: ['./app.js'],
  // 输出配置
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js'
  },
  module: {
    // 加载器配置
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader' },
      { test: /\.(png|jpg|jpeg)$/, loader: 'url-loader?limit=8192' }
    ]
  }
}