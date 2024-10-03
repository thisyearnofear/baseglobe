const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/rpc",
    createProxyMiddleware({
      target: "https://rpc.sepolia.org",
      changeOrigin: true,
      pathRewrite: {
        "^/rpc": "", // remove /rpc from the request path
      },
    })
  );
};
