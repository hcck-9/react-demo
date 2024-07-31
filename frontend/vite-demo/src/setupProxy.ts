/**
 * 反向代理配置
 * 一定记得要把mock.js注释掉，否则会先被mock.js拦截，到不了反向代理这一步。
 * setupProxy.js设置后，一定要重启项目才生效。
 */
const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app: any) {
  app.use(
    // 开发环境API路径匹配规则
    "^/api",
    createProxyMiddleware({
      // 要代理的真实接口API域名
      target: "http://xyz.com",
      changeOrigin: true,
    })
  );
};
