const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.js", // Correct relative path to entry file
  output: {
    path: path.resolve(__dirname, "dist"), // Output to 'dist' directory
    filename: "bundle.js", // Bundle file name
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"], // Loaders for CSS
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // Cleans the dist folder before build
    new HtmlWebpackPlugin({
      template: "./src/index.html", // Correct relative path to the HTML template
      filename: "index.html", // Output HTML file name
    }),
  ],
  devServer: {
    static: path.join(__dirname, "dist"), // Serve static files from 'dist'
    port: 8080,
    open: true, // Automatically open in browser
  },
};
