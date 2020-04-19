const merge = require("webpack-merge")
const common = require("./webpack.common")
const TerserPlugin = require("terser-webpack-plugin")

module.exports = merge(common, {
  mode: "production",
  performance: {
    maxEntrypointSize: 500000,
    maxAssetSize: 1000000,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          drop_console: true,
        },
      }),
    ],
  },
})
