// 这个文件是专门统一管理咱们项目中用到的所有的接口

import ajax from './ajax'
import mockAjax from './mockAjax'

// 这个函数专门用来请求三级分类
// export const reqCategoryList = () => {
//   return ajax({
//     url: '/product/getBaseCategoryList',
//     method: 'get',
//   })
// }

// 这个函数专门用来请求三级分类
export const reqCategoryList = () => ajax({url: '/product/getBaseCategoryList',method: 'get',})
// 这个函数专门用来请求banner轮播图数据的
export const reqBannerList=()=>mockAjax({url:'/banner',method:'get'})
// 这个函数专门用来请求楼层数据的
export const reqFloorList=()=>mockAjax({url:'/floor',method:'get'})