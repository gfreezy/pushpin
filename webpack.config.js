var path = require("path");
var webpack = require("webpack");
var SaveAssetsJson = require('assets-webpack-plugin');

module.exports = {
	cache: true,
	context: __dirname,
	entry: {
		vender: ["./node_modules/react", "./static/css/bootstrap.min.css"],
		app: "./static/js/src/app.jsx",
	},
	output: {
		path: path.join(__dirname, "static/js/dist"),
		publicPath: "static/js/dist/",
		filename: "[name].js",
		chunkFilename: "[name].js"
	},
	module: {
		loaders: [
			// required to write "require('./style.css')"
			{ test: /\.css$/,    loader: "style-loader!css-loader" },

			{ test: /\.woff2$/,  loader: "url-loader?prefix=font/&limit=5000&mimetype=application/font-woff2" },
			{ test: /\.woff$/,   loader: "url-loader?prefix=font/&limit=5000&mimetype=application/font-woff" },
			{ test: /\.ttf$/,    loader: "file-loader?prefix=font/" },
			{ test: /\.eot$/,    loader: "file-loader?prefix=font/" },
			{ test: /\.svg$/,    loader: "file-loader?prefix=font/" },

			// required for react jsx
	    { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
	    { test: /\.jsx$/, exclude: /node_modules/, loader: "babel-loader"},
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			// Automtically detect jQuery and $ as free var in modules
			// and inject the jquery library
			// This is required by many jquery plugins
			jQuery: "jquery",
			$: "jquery"
		}),
		new SaveAssetsJson(),
		new webpack.optimize.CommonsChunkPlugin({
			names: "vender",
			minChunks: Infinity,
		}),
	]
};
