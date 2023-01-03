// 一模块就是一个对象(小的store对象)

import { reqTradeInfo, reqUserAdressList } from "@/api"

export default {
  state:{
    tradeInfo:{},
    userAdressList:[]
  },
  mutations:{
    UPDATE_TRADEINFO(state,tradeInfo){
      state.tradeInfo = tradeInfo
    },
    UPDATE_USERADRESSLIST(state,userAdressList){
      state.userAdressList = userAdressList
    }
  },
  actions:{
    // 获取交易页信息的
    async getTradeInfo({commit}){
      const res = await reqTradeInfo()
      if(res.code===200){
        commit('UPDATE_TRADEINFO',res.data)
      }
    },
    // 获取用户地址的
    async getUserAdressList({commit}){
      const res = await reqUserAdressList()
      if(res.code===200){
        commit('UPDATE_USERADRESSLIST',res.data)
      }
    }
  },
  getters:{

  }
}