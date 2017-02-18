const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = {
	entry: [
		'webpack-hot-middleware/client',
		path.resolve(__dirname, 'client','src')
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development'),
				WEBPACK: true
			}
		})
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				include: path.resolve(__dirname, 'client'),
				query: {
					presets: [ 'react-hmre' ]
				}
			}, {
        test: /\.css$/,
        exclude: [/\/plugin\//],
        loader: "style-loader!css-loader"
      }, {
        test: /\.scss$/,
        exclude: [/\/plugin\//, /node_modules/],
        loader: 'style!css!autoprefixer!sass!text-transform'
      }
		]
	},
    postcss: function() {
        return [autoprefixer];
    }
};
