// 一模块就是一个对象(小的store对象)

import { reqCode, reqLogin, reqRegisterUser, reqUserInfo } from "@/api"

export default {
  state:{
    code:'',
    token:'',
    userInfo:{}
  },
  mutations:{
    UPDATE_CODE(state,code){
      state.code = code
    },
    UPDATE_TOKEN(state,token){
      state.token = token
    },
    UPDATE_USERINFO(state,userInfo){
      state.userInfo = userInfo
    }
  },
  actions:{
    // 获取验证码
    async getCode({commit},phone){
      const res = await reqCode(phone)
      if(res.code===200){
        commit('UPDATE_CODE',res.data)
        return 'ok'
      }else{
        return Promise.reject('fail')
      }
    },
    // 注册用户
    async getRegisterUser({commit},paramsObj){
      const res = await reqRegisterUser(paramsObj)
      if(res.code===200){
        return 'ok'
      }else{
        return Promise.reject('fail')
      }
    },
    // 用户登录
    async getLogin({commit},paramsObj){
      const res = await reqLogin(paramsObj)
      if(res.code===200){
        commit('UPDATE_TOKEN',res.data.token)
        return 'ok'
      }else{
        return Promise.reject('fail')
      }
    },
    // 获取用户信息
    async getUserInfo({commit}){
      const res = await reqUserInfo()
      if(res.code === 200){
        commit('UPDATE_USERINFO',res.data)
        return 'ok'
      }else{
        return Promise.reject('fail')
      }
    }
  },
  getters:{
    
  }
}