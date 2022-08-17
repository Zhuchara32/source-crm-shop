const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production'
    ? '/crm-shop/'
    : '/',
  transpileDependencies: true,
  devServer: {
    proxy: {
      '^/api': {
        // target: 'http://localhost:3080',
        target: 'https://api-node-fire.herokuapp.com',
        changeOrigin: true
      },
    }
  }
})
