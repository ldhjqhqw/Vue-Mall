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

// 对于咱们elementui当中的组件 使用方式3种  Vue.component Vue.use 增加到Vue原型当中
import { Button,MessageBox,Message } from 'element-ui';
Vue.component(Button.name, Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;

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
