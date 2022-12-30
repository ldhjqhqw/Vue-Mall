// 一模块就是一个对象(小的store对象)

import { reqCode } from "@/api"

export default {
  state:{
    code:''
  },
  mutations:{
    UPDATE_CODE(state,code){
      state.code = code
    }
  },
  actions:{
    async getCode({commit},phone){
      const res = await reqCode(phone)
      if(res.code===200){
        commit('UPDATE_CODE',res.data)
        return 'ok'
      }else{
        return Promise.reject('fail')
      }
    }
  },
  getters:{
    
  }
}