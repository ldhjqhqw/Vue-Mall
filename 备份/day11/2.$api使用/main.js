import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import  * as api from '@/api'
import '@/mock/mockServer'  //不需要用到里面的 意义是加载这个js文件 让他执行

Vue.component('TypeNav',TypeNav)  //之后可能很多组件都要用TypeNav  所以全局注册
Vue.component('Carousel',Carousel)
Vue.component('Pagination',Pagination)

Vue.config.productionTip = false

new Vue({
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$api = api
  },
  store,
  router,
  render: h => h(App),
}).$mount('#app')
