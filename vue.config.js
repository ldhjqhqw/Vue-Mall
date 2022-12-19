const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    open:true, //自动打开浏览器
    host:'127.0.0.1', //重新指定主机名
    proxy: {
      '/api': {
        target: 'http://sph-h5-api.atguigu.cn',
        // pathRewrite: { '^/api': '' },
        // 并不是所有时候都重写 关键点看真实那个地址需不需要这个路径前缀  需要不能重写 不要重写
      },
    },
  },
  lintOnSave:false, //忽略eslint语法检查
})
