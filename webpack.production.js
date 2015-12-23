var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  entry: {
    bundle: './src/index.js'
  },
  output: {
    path: __dirname + '/dist/',
    publicPath: '/',
    filename: '[name].js',
  },
  plugins: [
    // clean dist folder
    new Clean(['dist/*.js', 'dist/*.css', 'dist/*.gz']),
    new webpack.DefinePlugin({
      'process.env': {'NODE_ENV': '"production"'}
    }),
    new ExtractTextPlugin('[name].css', {
      allChunks: true
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: true
        }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style','css?modules&importLoaders=1&localIdentName=[hash:base64:5]!sass')
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json']
  }
};
