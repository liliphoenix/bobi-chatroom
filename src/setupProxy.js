const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://127.0.0.1:3006',//请求的真实地址
      changeOrigin: true,
      pathRewrite: { '^/api': '' }
    })
  )
}
