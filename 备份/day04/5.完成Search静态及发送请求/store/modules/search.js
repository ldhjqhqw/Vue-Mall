// 一模块就是一个对象(小的store对象)

import { reqSearchGoods } from "@/api"

export default {
  state:{
    goodsInfo:{}
  },
  mutations:{
    UPDATE_GOODSINFO(state,goodsInfo){
      state.goodsInfo = goodsInfo
    }
  },
  actions:{
    async getGoodsInfo({commit},searchParmas){
      const res = await reqSearchGoods(searchParmas)
      if(res.code===200){
        commit('UPDATE_GOODSINFO',res.data)
      }
    }
  },
  getters:{
    
  }
}