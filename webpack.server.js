var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.config')
var port = 7000;

  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    compress: true,
    stats: {
      colors: true,
      hash: true,
      timings: true,
      chunks: false
    }
  }).listen(port, "0.0.0.0", function (err) {
    if (err) {
      console.log(err)
    }

    console.log('Webpack dev server is listening at localhost:' + port)
  })

