const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, '/src/server/public/js/init.js'),
  devtool: 'inline-source-map',

  output: {
    path: path.join(__dirname, '/src/server/public/dist'),
    publicPath: "/dist/",
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            {
              loader: 'postcss-loader'
            }
          ]
        })
      },
      {//loader img
        test: /\.(png|jpg|gif|svg)$/,
        use: [{
          loader: 'file-loader',
          query: {
            name: 'images/img-[hash].[ext]'
          }
        }]


      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin({
      filename: 'main.css'
    }),
    new CleanWebpackPlugin(['src/server/public/dist'])
  ]
};
