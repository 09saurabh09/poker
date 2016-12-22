'use strict';
let path = require('path'),
  fs = require('fs'),
  webpack = require("webpack"),
  appPath = path.join(__dirname, 'client/src'),
  wwwPath = path.join(__dirname, 'public'),
  pkg = require('./package.json'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  environment = process.env.NODE_ENV;

let config = {
  entry: {
    vendor : ['react', 'react-dom'],
    app: appPath
  },
  output: {
    path: path.join(wwwPath),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.html$/,
      include: [/\/app\/|\/assets\//],
      loader: 'file?name=[name].html'
    }, {
      test: /\.(png|jpg|mp4)$/,
      loader: 'file?name=[name].[ext]' // inline base64 URLs for <=10kb images, direct URLs for the rest
    }, {
      test: /\.css$/,
      exclude: [/\/plugin\//],
      loader: "style-loader!css-loader"
    }, {
      test: /\.scss$/,
      exclude: [/\/plugin\//, /node_modules/],
      loader: 'style!css!autoprefixer!sass!text-transform'
    }, {
      test: /plugin\/[a-zA-Z-.]*.js$/,
      loader: 'file?name=[name].[ext]'
    }, {
      test: /plugin\/[a-zA-Z-.]*.css$/,
      loader: 'file?name=[name].[ext]'
    }, {
      test: /\.(jsx|js)$/,
      exclude: [/(node_modules)/, /\/plugin\//],
      loader: "babel"
    }, {
      test: [/fontawesome-webfont\.svg/, /fontawesome-webfont\.eot/, /fontawesome-webfont\.ttf/, /fontawesome-webfont\.woff/, /fontawesome-webfont\.woff2/],
      loader: 'file?name=fonts/[name].[ext]'
    }, {
      test: [/\.(woff|woff2|eot|ttf|svg)$/],
      loader: 'url-loader?limit=100000'
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      env: JSON.stringify(environment)
    }),

    new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor'],

        // options.name modules only
        minChunks: Infinity
    }),

    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    }),
    // HtmlWebpackPlugin: Simplifies creation of HTML files to serve your webpack bundles : https://www.npmjs.com/package/html-webpack-plugin
    new HtmlWebpackPlugin({
      template: require('html-webpack-template'),
        title: pkg.title,
        appMountId: 'root',
        inject: false
    }),
    // OccurenceOrderPlugin: Assign the module and chunk ids by occurrence count. : https://webpack.github.io/docs/list-of-plugins.html#occurenceorderplugin
    new webpack.optimize.OccurenceOrderPlugin(),

    // Deduplication: find duplicate dependencies & prevents duplicate inclusion : https://github.com/webpack/docs/wiki/optimization#deduplication
    new webpack.optimize.DedupePlugin()
  ]
};

if (environment != 'development') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true,
      beautify: true
    })
  );
}

module.exports = config;
