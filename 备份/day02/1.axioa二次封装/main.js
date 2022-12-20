import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import TypeNav from '@/components/TypeNav'

Vue.component('TypeNav',TypeNav)  //之后可能很多组件都要用TypeNav  所以全局注册

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
