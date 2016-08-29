var webpack = require('webpack');

module.exports = {
	entry: "./src/main/resources/META-INF/resources/js/src/main.js",
	devServer: {
		port: 3000,
		proxy: {
			'**': 'http://localhost:8080'
		},
		publicPath: '/o/hello-react-1.0.0/js/dist/'
	},
	output: {
		path: './src/main/resources/META-INF/resources/js/dist',
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{
				exclude: /node_modules/,
				loader: 'babel',
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
		})
	]
};