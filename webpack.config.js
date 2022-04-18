// Настройки webpack
// https://www.taniarascia.com/how-to-use-webpack/
// https://www.youtube.com/watch?v=vHRvO4jn6Oc

const path = require('path')

module.exports = {
  mode: 'production',
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    // filename: '[name].bundle.js',
    filename: 'webpack-numbers.js',
    library: "webpackNumbers",
  },
  // output: {
  //   path: path.resolve(__dirname, './dist'),
  //   filename: 'bundle.js',
  //   // filename: '[name].bundle.js',
  // },
  
  // module: {
  //   rules: [
  //     {
  //       test: /\.js$/,
  //       exclude: /node_modules/,
  //       use: ['babel-loader'],
  //     },
  //   ],
  // },
  
}