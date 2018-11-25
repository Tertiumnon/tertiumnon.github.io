const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'inline-source-map',
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        'style-loader', // creates style nodes from JS strings
        'css-loader', // translates CSS into CommonJS
        'sass-loader', // compiles Sass to CSS, using Node Sass by default
      ],
    }],
  },
  plugins: [
    // new CleanWebpackPlugin(['dist']),
    // new HtmlWebpackPlugin({
    //   title: 'Development',
    // }),
  ],
  output: {
    filename: 'index.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: path.resolve(__dirname, 'images'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    compress: true,
    port: 3000,
    watchOptions: {
      poll: true,
    },
  },
};
