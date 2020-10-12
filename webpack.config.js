const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  devtool: 'inline-source-map',
  entry: {
    main: [
      'index.ts',
      'css/styles.scss'
    ]
  },
  module: {
    rules: [{
      exclude: /node_modules/,
      test: /.ts$/,
      use: [ 'ts-loader' ]
    }, {
      test: /\.s?css$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }, {
      test: /\.(eot|jpg|jpeg|png|svg|ttf|woff2?)$/,
      use: [ 'file-loader' ]
    }]
  },
  output: {
    filename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.ejs'
    })
  ],
  resolve: {
    alias: {
      assets: path.resolve(__dirname, 'assets'),
    },
    extensions: [ '.js', '.ts' ],
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ]
  }
}
