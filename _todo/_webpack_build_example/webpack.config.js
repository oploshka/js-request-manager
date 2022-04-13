
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './test/site/script.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: './js-request-manager.js',
    // library: 'requestManager',
    // libraryTarget: "umd" // exposes and know when to use module.exports or exports.
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './test/site/index.html'),
      minify: {
        removeComments: false,
        collapseWhitespace: false,
      },
    }),
  ],

  //...
  stats: 'errors-only',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    watchContentBase: true,
  },

  resolve: {
    alias: {
      'js-request-manager': __dirname,
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
    ],
  },
};
