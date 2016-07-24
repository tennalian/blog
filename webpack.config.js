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
			{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            { test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
		]
	},
	devServer:{
		contentBase: './',
		port: 3000,
		hot: true,
		historyApiFallback: true
	}
};
