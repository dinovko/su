const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
            }
          },
          {
            loader: 'ifdef-loader',
            options: {
              PRODUCTION: process.env.NODE_ENV === 'production',
              DEVELOPMENT: process.env.NODE_ENV === 'development',
              "ifdef-verbose": true, // Добавьте для подробных логов
            }
          }
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias:{
      '@src':path.resolve(__dirname,'src')
    }
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
};