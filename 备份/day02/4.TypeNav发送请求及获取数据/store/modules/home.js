// 一模块就是一个对象(小的store对象)
import {reqCategoryList} from '@/api'

export default {
  state:{
   categoryList:[]  //初始化数据
  },
  mutations:{
    UPDATE_CATEGORYLISt(state,categoryList){
      state.categoryList = categoryList
    }
  },
  actions:{
    async getCategoryList({commit}){
     const res = await reqCategoryList()
     if(res.code===200){
      commit('UPDATE_CATEGORYLISt',res.data)
     }
    }
  },
  getters:{
    
  }
}