// 一模块就是一个对象(小的store对象)
import {reqBannerList, reqCategoryList, reqFloorList} from '@/api'

export default {
  state:{
   categoryList:[],  //初始化数据
   bannerList:[],
   floorList:[]
  },
  mutations:{
    UPDATE_CATEGORYLISt(state,categoryList){
      state.categoryList = categoryList
    },
    UPDATE_BANNERLIST(state,bannerList){
      state.bannerList = bannerList
    },
    UPDATE_FLOORLIST(state,floorList){
      state.floorList = floorList
    }
  },
  actions:{
    // 获取三级分类
    async getCategoryList({commit}){
     const res = await reqCategoryList()
     if(res.code===200){
      // 之后工作千万别这么做 去改你样式
      commit('UPDATE_CATEGORYLISt',res.data.slice(0,15))
     }
    },
    // 获取banner轮播图的
    async getBannerList({commit}){
      const res = await reqBannerList()
      if(res.code===200){
        commit('UPDATE_BANNERLIST',res.data)
      }
    },
    // 获取楼层数据
    async getFloorList({commit}){
      const res = await reqFloorList()
      if(res.code===200){
        commit('UPDATE_FLOORLIST',res.data)
      }
    }
  },
  getters:{
    
  }
}