// 一模块就是一个对象(小的store对象)

import { reqAddShopcart, reqShopcartList } from "@/api"

export default {
  state:{
    shopcartList:[]
  },
  mutations:{
    UPDATE_SHOPCARTLIST(state,shopcartList){
      state.shopcartList = shopcartList
    }
  },
  actions:{
    // 添加购物车
    async getAddShopcart({commit},{skuId,skuNum}){
      // async通常都写在函数的前面  代表这个函数是一个异步函数(里面通常都会有一些异步代码)
      // async函数的返回值一定是一个promise 并不是你return的值!!!
      // async函数返回的promise是成功的还是失败的 取决于return的值!!!

      // return的值分两大类  1.非promise值  2.promise的值
      // return的是非promise的值
      //  async函数返回的promise就是成功的 成功的值就是你所return的值
      // return的是promise值
      //   return的是成功promise 那么async函数返回的那个promise也是成功的 他成功的值就是你return成功promise的值
      //   return的是失败promise 那么async函数返回的那个promise就是失败的 他失败的原因就是你return失败promise的原因
      // 如果在async函数内部抛出错误 那么async函数返回的结果也是失败promise  失败promise的失败原因就是抛出的错误
      const res = await reqAddShopcart(skuId,skuNum)

      if(res.code === 200){  //说明后端把商品存在了数据库中
        return 'ok'
      }else{  //没有存起来
        return Promise.reject('fail')
      }

      // return 123
      // return Promise.resolve(123)
      // return Promise.reject(123)
    },
    // 获取购物车列表
    async getShopcartList({commit}){
      const res = await reqShopcartList()
      if(res.code===200){
        commit('UPDATE_SHOPCARTLIST',res.data)
      }
    }
  },
  getters:{
    
  }
}