const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: __dirname + "/src/frontend/public/js/init.js",
  output: {
    path: __dirname + '/src/frontend/public/dist',
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
    })
  ]
};
