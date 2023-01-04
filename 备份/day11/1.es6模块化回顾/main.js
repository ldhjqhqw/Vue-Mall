import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import '@/mock/mockServer'  //不需要用到里面的 意义是加载这个js文件 让他执行

Vue.component('TypeNav',TypeNav)  //之后可能很多组件都要用TypeNav  所以全局注册
Vue.component('Carousel',Carousel)
Vue.component('Pagination',Pagination)


// 分别暴露的引入方式
// import {a} from './es6模块化回顾'
// import * as obj from './es6模块化回顾'

// 统一暴露的引入方式
// import {a} from './es6模块化回顾'
// import * as obj from './es6模块化回顾'
// console.log(a)
// console.log(obj)

// 默认暴露的引入方式
// import obj from './es6模块化回顾' //简写
// import {default as obj } from './es6模块化回顾' //全写
import * as obj from './es6模块化回顾'
console.log(obj)



Vue.config.productionTip = false

new Vue({
  beforeCreate(){
    Vue.prototype.$bus = this
  },
  store,
  router,
  render: h => h(App),
}).$mount('#app')
