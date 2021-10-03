// 跨域配置
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app){
    app.use(createProxyMiddleware('/ajax', {
        target: 'https://m.maoyan.com', // 代理目标地址，代理到本地 localhost:3000
        changeOrigin: true
    }))
}