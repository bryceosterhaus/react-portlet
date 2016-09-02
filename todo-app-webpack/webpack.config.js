var path = require('path');
var webpack = require('webpack');

var JS_PUBLIC = '/o/todo-app-webpack-1.0.0/js/dist/';

var JS_SRC = path.resolve(__dirname, 'src/main/resources/META-INF/resources/js/src/');

module.exports = {
	devServer: {
		hot: true,
		port: 3000,
		proxy: {
			'**': 'http://0.0.0.0:8080'
		},
		publicPath: JS_PUBLIC
	},
	entry: [
		'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
		'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
		path.resolve(JS_SRC, 'main.js') // Your appʼs entry point
	],
	module: {
		loaders: [
			{
				include: JS_SRC,
				loader: 'react-hot'
			},
			{
				include: JS_SRC,
				loader: ['babel'],
				query: {
					presets: ['es2015', 'react']
				}
			}
		]
	},
	output: {
		filename: 'bundle.js',
		path: './src/main/resources/META-INF/resources/js/dist',
		publicPath: JS_PUBLIC
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
};