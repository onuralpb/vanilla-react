const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
	mode         : "development",
	entry        : path.join(__dirname, "src", "index.js"),
	output       : {
		path     : path.join(__dirname, "build"),
		filename : "index.bundle.js",
	},
	devServer    : {
		contentBase : path.join(__dirname, "src", "index.html"),
		port        : 3004,
		hot         : true,
		inline      : true,
		compress    : true,
		open        : true,
	},
	optimization : {
		minimize : true,
	},
	module       : {
		rules : [
			{
				test    : /\.(js|jsx)$/,
				exclude : /node_modules/,
				loader  : "babel-loader",
				options : { presets: [ "@babel/env", "@babel/react" ] },
				// options : { babelrcRoots: [ " . ", " ../ " ] },
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
	resolve      : { extensions: [ "*", ".js", ".jsx" ] },
	plugins      : [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebPackPlugin({ template: path.join(__dirname, "src", "index.html") }) /* new BundleAnalyzerPlugin() */,
	],
};
