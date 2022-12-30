import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
Vue.use(VueRouter)

// 一劳永逸

// 保存下来原先人家提供的push方法
let originPush = VueRouter.prototype.push
// 修改人家原先的push方法
VueRouter.prototype.push=function(localtion,resolve,reject){ //这是咱的push
  if(resolve===undefined && reject === undefined){ //没有传递成功回调还有失败回调
    // originPush() 不敢直接调用 this人家原先是router 
    // this ==> router
    // 借助原先的push跳转的能力以及返回值  但是就多一个catch的功能
   return originPush.call(this,localtion).catch(()=>{})
  }else{ //有可能传了两个回调也有可能传递了一个回调
    return originPush.call(this,localtion,resolve,reject)
  } 
}

let originReplace = VueRouter.prototype.replace
VueRouter.prototype.replace=function(localtion,resolve,reject){ 
  if(resolve===undefined && reject === undefined){
   return originReplace.call(this,localtion).catch(()=>{})
  }else{
    return originReplace.call(this,localtion,resolve,reject)
  } 
}

export default new VueRouter({
  routes,
  scrollBehavior () {
    return {
      // x在控制水平滚动条的位置
      // y在控制垂直滚动条的位置
      y:0,
    }
  }
})