var webpack = require('webpack');


module.exports = {
	entry: [
		'webpack/hot/dev-server',
		'./app/app'
	],
	output: {
		path: './',
		filename: 'build.js'
	},
	resolve: {
        extensions: ['', '.js']
    },
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				query: {
		          	presets: ['es2015']
		        },
				exclude: /\/node_modules/
			},
			{
				test: /\.scss$/,
				loader: 'style!css!sass',
				exclude: /\/node_modules/
			},
			{
				test: /\.css$/,
				loader: 'style!css',
				exclude: /\/node_modules/
			},
			{
				test: /\.(eot|woff|woff2|ttf|svg)?$/,
				loader: "file?name=[path][name].[ext]"
			}
		]
	},
	devServer:{
		contentBase: './',
		port: 3000,
		hot: true,
		historyApiFallback: true
	}
};
