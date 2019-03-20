const path = require ('path');
const webpack = require ('webpack');
const HtmlWebPackPlugin = require ('html-webpack-plugin');
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  mode: 'development',
  entry: path.join (__dirname, 'src', 'index.js'),
  output: {
    path: path.join (__dirname, 'build'),
    filename: 'index.bundle.js',
    publicPath: '/',
  },
  devServer: {
    contentBase: path.join (__dirname, 'src', 'public'),
    port: 3004,
    hot: true,
    inline: true,
    open: true,
    historyApiFallback: true,
  },
  optimization: {
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {presets: ['@babel/env', '@babel/react']},
        // options: {babelrcRoots: [' . ', ' ../ ']},
      },

      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        loaders: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          context: path.resolve (__dirname, 'src/assets/img/'),
          outputPath: 'img/',
          publicPath: '/',
          useRelativePaths: true,
        },
      },
    ],
  },
  resolve: {
    modules: [path.resolve (__dirname, 'src'), 'node_modules'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin (),
    new HtmlWebPackPlugin ({
      template: path.join (__dirname, 'public', 'index.html'),
    }) /* new BundleAnalyzerPlugin() */,
  ],
};
