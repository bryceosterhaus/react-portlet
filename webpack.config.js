var webpack = require('webpack');

module.exports = {
	entry: "./src/main/resources/META-INF/resources/js/src/main.js",
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