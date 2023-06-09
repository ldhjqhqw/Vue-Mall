// 一模块就是一个对象(小的store对象)

import { reqCode, reqLogin, reqLogout, reqRegisterUser, reqUserInfo } from "@/api"
import { setToken,getToken, removeToken } from "@/utils/userAbout"

export default {
  state:{
    code:'',
    token:getToken(),
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
    },
    UPDATE_USERABOUT(state){
      state.token = ''
      state.userInfo = {}
      removeToken()
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
        // 第一次拿到这个token  在localStorage中保存一份
        setToken(res.data.token)
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
    },
    // 退出登录
    async getLogout({commit}){
      const res = await reqLogout()
      if(res.code===200){ //走进这个判断说明后端成功删除了这个token
        commit('UPDATE_USERABOUT')
        return 'ok'
      }else{
        return Promise.reject('fail')
      }
    }
  },
  getters:{
    
  }
}