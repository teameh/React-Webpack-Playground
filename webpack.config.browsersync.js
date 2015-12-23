var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WriteFilePlugin = require('write-file-webpack-plugin').default;
var Clean = require('clean-webpack-plugin');

var devServer = {
    contentBase: path.resolve(__dirname),
    colors: true,
    quiet: false,
    noInfo: false,
    publicPath: '/builds/',
    outputPath: './builds',
    historyApiFallback: false,
    host: '127.0.0.1',
    port: 8000,
    hot: true
};

module.exports = {
  entry: {
    bundle: [
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client',
      './index.js'
    ]
  },
  devtool: 'source-map',
  // devtool: 'inline-source-map',
  debug: true,
  devServer: devServer,
  context: path.resolve(__dirname, './src'),
  output: {
    path: path.resolve(__dirname, devServer.outputPath),
    filename: '[name].js',
    publicPath: devServer.publicPath
  },
  plugins: [
    new Clean('builds'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.OldWatchingPlugin(),
    new webpack.NoErrorsPlugin(),
    new WriteFilePlugin(),
    new ExtractTextPlugin('[name].css', {
      allChunks: true
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style','css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass')

        // loader: ExtractTextPlugin.extract('style-loader','css-loader?sourceMap!sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true') }

        // loader: ExtractTextPlugin.extract('style','css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true')
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json']
  }
};