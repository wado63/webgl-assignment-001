const HtmlWebpackPlugin = require("html-webpack-plugin")
const ForkTsChecker = require("fork-ts-checker-webpack-plugin")
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin")

module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "development",

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: "./src/index.ts",
  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/dist`,
    // 出力ファイル名
    filename: "main.js",
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
      {
        // 拡張子 .ts の場合
        test: /\.(ts|js)$/,
        // TypeScript をコンパイルする
        use: "babel-loader",
        exclude: /node_modules\/(?!(three)\/).*/,
      },
    ],
  },
  // import 文で .ts ファイルを解決するため
  resolve: {
    extensions: [".ts", ".js"],
    plugins: [new TsconfigPathsPlugin()],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new ForkTsChecker(),
  ],
  devtool: "eval-source-map",
  devServer: {
    contentBase: `${__dirname}/dist`,
    // host: "192.168.10.106",
  },
}
