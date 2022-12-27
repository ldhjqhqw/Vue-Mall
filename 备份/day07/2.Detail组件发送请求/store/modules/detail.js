// 一模块就是一个对象(小的store对象)

import { reqGoodsDetail } from "@/api"

export default {
  state:{
    goodsDetail:{}
  },
  mutations:{
    UPDATE_GOODSDETAIL(state,goodsDetail){
      state.goodsDetail = goodsDetail
    }
  },
  actions:{
    async getGoodsDetail({commit},skuId){
      const res = await reqGoodsDetail(skuId)
      if(res.code === 200){
        commit('UPDATE_GOODSDETAIL',res.data)
      }
    }
  },
  getters:{
    
  }
}