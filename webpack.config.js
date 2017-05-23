const webpack = require('webpack');
const UglifyJSPlugin = require('uglify-es-webpack-plugin');
module.exports = {
  entry: __dirname + "/src/frontend/public/js/init.js",                     // 唯一打包入口文件
  output: {
    path: __dirname + '/src/frontend/public/dist',          // 打包后文件存放的地方
    filename: 'bundle.js'              // 打包后输出文件的文件名
  },
  module: {
    rules: [
      {
        test: /\.js$/,                              // 匹配打包文件后缀名的正则
        exclude: /(node_modules|bower_components)/, // 这些文件夹不用打包
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin()
    // new webpack.optimize.UglifyJsPlugin({})
  ]
};