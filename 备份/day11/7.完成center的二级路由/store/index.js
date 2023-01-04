import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import user from './modules/user'
import search from './modules/search'
import detail from './modules/detail'
import shopcart from './modules/shopcart'
import trade from './modules/trade'
Vue.use(Vuex)

const state = {
 
}
const mutations = {

}
const actions = {

}
const getters = {

}
const modules = {
  // 属性名是那个模块对象的名字
  home,
  user,
  search,
  detail,
  shopcart,
  trade
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules
})