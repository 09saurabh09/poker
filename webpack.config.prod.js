const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: path.resolve(__dirname, 'client/src'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	plugins: [
		new webpack.ProvidePlugin({
	        $: "jquery",
	        jQuery: "jquery"
      	}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
				WEBPACK: true
			}
		}),
		/*new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			}
		}),*/
		new CopyWebpackPlugin([
			{
				from: path.resolve(__dirname, 'client/src', 'assets'),
				to: path.resolve(__dirname, 'dist', 'assets')
			}
		]),
		new ExtractTextPlugin('bundle.css')
	],
	module: {
		loaders: [
			{ 
				test:  /\.(jsx|js)$/,
				loader: 'babel'
			},
			{
		        test: /\.css$/,
		        exclude: [/\/plugin\//],
		        loader: "style-loader!css-loader"
		    }, {
		        test: [/ProximaNova-\/[a-zA-Z]*-webfont\.ttf/],
		        loader: 'file?name=fonts/[name].[ext]'
		    }, {
		        test: [/\.(woff|woff2|eot|ttf|svg)$/],
		        loader: 'url-loader?limit=100000'
		    },
			{
				test: /\.scss/,
				loader: ExtractTextPlugin.extract('style', 'css!sass!postcss'),
				include: path.resolve(__dirname, 'client')
			}
		]
	},
    postcss: function() {
        return [autoprefixer];
    }
};
