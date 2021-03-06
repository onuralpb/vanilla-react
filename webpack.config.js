const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  mode: "development",
  entry: [
    "react-hot-loader/patch",
    "webpack/hot/only-dev-server",
    "webpack-dev-server/client?http://localhost:3004/",
    "./src/index.js",
  ],
  cache: false,
  //devtool: "source-map",  add .map files
  output: {
    filename: "[name].js",
    chunkFilename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    contentBase: path.join(__dirname, "src", "public"),
    port: 3004,
    hot: true,
    inline: true,
    open: true,
    historyApiFallback: true,
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: "all",
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/env", "@babel/react"],
        },
      },
      {
        test: /\.(css|scss)$/,
        loaders: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.(ttf|eot|otf|woff|jpg|jpeg|png|gif|mp3|svg)$/,
        loaders: "file-loader",
        options: {
          name: "[path][name].[ext]",
          context: path.resolve(__dirname, "src/assets/img/"),
          outputPath: "img/",
          publicPath: "/",
          useRelativePaths: true,
        },
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },
  plugins: [
    new webpack.DefinePlugin({ "process.env.NODE_ENV": '"production"' }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebPackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
    //new CompressionPlugin()
    // new BundleAnalyzerPlugin(),
  ],
};
