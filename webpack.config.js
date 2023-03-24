const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: path.join(SRC_DIR, 'index.jsx'),
  output: {
    path: DIST_DIR,
    filename: 'bundle.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src/css'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Atelier',
      template: path.resolve(__dirname, '/templates/template.html'),
    }),
    new Dotenv({
      path: './.env',
      systemvars: true,
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@components': path.resolve(
        __dirname,
        './client/src/components/',
      ),
      '@assets': path.resolve(
        __dirname,
        './client/src/assets/',
      ),
      '@reducers': path.resolve(
        __dirname,
        './client/src/reducers/',
      ),
      '@fonts': path.resolve(
        __dirname,
        './client/src/assets/fonts/',
      ),
      '@icons': path.resolve(
        __dirname,
        './client/src/assets/icons/',
      ),
      '@images': path.resolve(
        __dirname,
        './client/src/assets/images/',
      ),
      '@css': path.resolve(
        __dirname,
        './client/src/css/',
      ),
      '@store': path.resolve(
        __dirname,
        './client/src/store/store.js',
      ),
      '@modular': path.resolve(
        __dirname,
        './client/src/modular',
      ),
    },
  },
};
