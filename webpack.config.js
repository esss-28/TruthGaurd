const path = require("path");

module.exports = {
  entry: {
    background: "./background.js",
    content: "./content.js",
    popup: "./popup/popup.js",
  },
  output: {
    filename: "[name].bundle.js", // background.bundle.js, content.bundle.js, popup.bundle.js
    path: path.resolve(__dirname, "extension/dist"), // Output to dist/ folder
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  stats: {
    errorDetails: true, // Show detailed error messages
  },
};
