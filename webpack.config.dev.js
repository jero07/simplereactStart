const HtmlWebpackPlugin = require("html-webpack-plugin"); 
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require("webpack");
const path = require("path");

const config = { 
  // entry: './src/index.js',
  entry: [
    "webpack-hot-middleware/client?reload=true", //note that it reloads the page if hot module reloading fails.
    path.resolve(__dirname, "src/index")
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "bundle.js"
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    hot: true,
    historyApiFallback: true,
    noInfo: false,
    stats: 'minimal'
  },
  resolveLoader: {
    moduleExtensions: ["-loader"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.join(__dirname, "src")],
        use: [
          {
            loader: "babel"
          }
        ]
      },{
        test: /(\.css)$/,
        use: [
          {
            loader: "style"
          }, {
            loader: "css"
          }
        ]
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file"
          }
        ]
      }, {
        test: /\.(woff|woff2)$/,
        use: [
          {
            loader: "url?prefix=font/&limit=5000"
          }
        ]
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "url?limit=10000&mimetype=application/octet-stream"
          }
        ]
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "url?limit=10000&mimetype=image/svg+xml"
          }
        ]
      },
      { test: /\.txt$/, use: "raw" }
    ]
  },
  plugins: [ 
    new CleanWebpackPlugin(['dist']),
    new webpack.optimize.UglifyJsPlugin(), 
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new webpack.HotModuleReplacementPlugin(),   
    new webpack.NoEmitOnErrorsPlugin(),
  ]
};

module.exports = config;
