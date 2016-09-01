var webpack = require('webpack');

module.exports = {
	entry: [
		'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
		'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
		'./src/main/resources/META-INF/resources/js/src/main.js' // Your appʼs entry point
	],
	devServer: {
		hot: true,
		port: 3000,
		proxy: {
			'**': 'http://0.0.0.0:8080'
		},
		publicPath: 'http://0.0.0.0:3000/o/todo-app-webpack-1.0.0/js/dist/'
	},
	output: {
		path: './src/main/resources/META-INF/resources/js/dist',
		filename: "bundle.js",
		publicPath: '/o/todo-app-webpack-1.0.0/js/dist/'
	},
	module: {
		loaders: [
			{
				exclude: /node_modules/,
				loader: 'react-hot'
			},
			{
				exclude: /node_modules/,
				loader: ['babel'],
				query: {
					presets: ['es2015', 'react']
				}
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("production")
			}
		}),
		new webpack.HotModuleReplacementPlugin()
	]
};