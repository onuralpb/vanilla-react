const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
	entry     : "./src/index.js",
	mode      : "development",
	module    : {
		rules : [
			{
				test    : /\.(js|jsx)$/,
				exclude : /node_modules/,
				loader  : "babel-loader",
				options : { presets: [ "@babel/env" ] },
			},

			{
				test : /\.scss$/,
				use  : [ "style-loader", "css-loader", "sass-loader" ],
			},
			{
				test : /\.html$/,
				use  : [
					{
						loader : "html-loader",
					},
				],
			},
		],
	},
	resolve   : { extensions: [ "*", ".js", ".jsx" ] },
	output    : {
		path       : path.resolve(__dirname, "dist/"),
		publicPath : "/dist/",
		filename   : "bundle.js",
	},
	devServer : {
		contentBase : path.join(__dirname, "public/"),
		port        : 3000,
		publicPath  : "http://localhost:3000/dist/",
		hot         : true,
		inline      : true,
		compress    : true,
		open        : true,
	},
	plugins   : [ new webpack.HotModuleReplacementPlugin(), new HtmlWebPackPlugin() ],
};
