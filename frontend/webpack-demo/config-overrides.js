const {
  override,
  addWebpackAlias,
  addWebpackResolve,
} = require("customize-cra");
const path = require("path");
module.exports = override(
  addWebpackAlias({
    // 指定@符指向src目录
    "@": path.resolve(__dirname, "src"),
  }),
  addWebpackResolve({
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  })
);
