const path = require("path");
const dotenv = require("dotenv");
const webpack = require("webpack");

module.exports = () => {
  const env = dotenv.config().parsed;
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});
  return {
    entry: "./src/client/components/Index.js",
    output: {
      path: path.resolve(__dirname, "public"),
      publicPath: "/dist/",
      filename: "bundle.js",
      chunkFilename: "[name].bundle.js",
    },
    devServer: {
      contentBase: "./",
      publicPath: "/dist/",
      historyApiFallback: true,
      hot: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: "file-loader",
              options: {},
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx", ".json", ".wasm", ".mjs", "*"],
    },
    plugins: [new webpack.DefinePlugin(envKeys)],
  };
};
