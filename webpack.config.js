const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
require("babel-polyfill");

module.exports = {
  mode: 'none',
  entry: ['babel-polyfill', './src/app/app.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ],
    alias: {
      '@less-helpers-module': path.resolve(__dirname, 'src/assets/less/helpers'), // alias for less helpers
      '@assets-root-path': path.resolve(__dirname, 'src/assets') // alias for assets (use for images & fonts)
    }
  },
  module: {
    rules: [
      {
        test: /\.handlebars$/,
        loader: "handlebars-loader"
      }, {
        test: /\.js$/i,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              ["@babel/plugin-proposal-class-properties"],
            ],
          },
        },
      }, {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      }, {
        test: /\.(jpg|jpeg|png|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'images/[name].[ext]'
          }
        }]
      }, {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    }),
    new CopyWebpackPlugin([
      'src/index.html', // will copy to root of outDir (./dist folder)
      {
        from: 'src/static/',
        to: 'static'
      },
      {
        from: 'src/assets/images',
        to: 'images'
      }
    ])
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: './dist',
    port: 3000,

  }
};


