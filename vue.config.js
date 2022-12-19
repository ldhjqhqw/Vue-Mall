const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    open:true, //自动打开浏览器
    host:'127.0.0.1', //重新指定主机名
  },
  lintOnSave:false, //忽略eslint语法检查
})
