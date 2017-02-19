const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = {
	entry: [
		'webpack-hot-middleware/client',
		path.resolve(__dirname, 'client/src')
	],
	output: {
		path: path.resolve(__dirname, 'client/src'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	plugins: [
		new webpack.ProvidePlugin({
	        $: "jquery",
	        jQuery: "jquery"
      	}),
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
				test:  /\.(jsx|js)$/,
				loader: 'babel',
				query: {
					presets: [ 'react-hmre' ]
				}
			}, {
		        test: /\.css$/,
		        exclude: [/\/plugin\//],
		        loader: "style-loader!css-loader"
		    }, {
				test: /\.scss/,
				loader: 'style!css!sass!postcss',
				include: path.resolve(__dirname, 'client')
			}, {
		        test: [/ProximaNova-\/[a-zA-Z]*-webfont\.ttf/],
		        loader: 'file?name=fonts/[name].[ext]'
		    }, {
		        test: [/\.(woff|woff2|eot|ttf|svg)$/],
		        loader: 'url-loader?limit=100000'
		    }
		]
	},
    postcss: function() {
        return [autoprefixer];
    }
};
