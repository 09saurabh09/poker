var path = require('path')
var webpack = require('webpack')
var AssetsPlugin = require('assets-webpack-plugin')
const isoTools = require('./config/isomorphic.tools');
/*const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');*/

var DEBUG = !(process.env.NODE_ENV === 'production')

if (DEBUG) {
  require('dotenv').config()
}

var config = {
  devtool: DEBUG ? 'cheap-module-eval-source-map' : false,
  entry: {
    app: './client/src/index',
    vendor: [
      'react',
      'react-router',
      'redux',
      'react-dom',
      'lodash',
      'bluebird',
      'humps',
      'history'
    ]
  },
  resolve: {
    modules: [ path.join(__dirname, 'client/src'), 'node_modules' ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    isoTools.plugin(),
    new webpack.EnvironmentPlugin(['NODE_ENV', 'API_BASE_URL']),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "React": "react"
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        WEBPACK: true
      }
    })/*,
    new ExtractTextPlugin('main.css')*/
  ],
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: __dirname
      },/*{
        test: /\.css$/,
        exclude: [/\/plugin\//],
        loader: "style-loader!css-loader"
      }, {
        test: /\.scss/,
        loader: ExtractTextPlugin.extract('style', 'css!sass!autoprefixer'),
        include: path.resolve(__dirname, 'client')
      },*/ {
        test: [/ProximaNova-\/[a-zA-Z]*-webfont\.ttf/],
        loader: 'file?name=fonts/[name].[ext]'
      }, {
        test: [/\.(woff|woff2|eot|ttf)$/],
        loader: 'url-loader?limit=100000'
      }, {
        test: /\.svg$/,
        include: [/client\/assets/],
        loaders: ['svg-inline-loader']
      }
    ]
  }
}


if (DEBUG) {
  config.entry.dev = [
    'webpack-dev-server/client?http://localhost:7000',
    'webpack/hot/only-dev-server',
  ]

  config.plugins = config.plugins.concat([
    
    
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filname: 'vendor.js'
    })
  ])
  config.output.publicPath = 'http://localhost:7000/static/'
  config.module.rules[0].options = {
    "env": {
      "development": {
        "presets": ["react-hmre"]
      }
    }
  }
} else {
  config.plugins = config.plugins.concat([
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filname: '[name].[chunkhash].js'
    }),
    new webpack.optimize.UglifyJsPlugin(),
  ])
}

module.exports = config
