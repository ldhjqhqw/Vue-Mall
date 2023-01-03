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

const router = new VueRouter({
  routes,
  scrollBehavior () {
    return {
      // x在控制水平滚动条的位置
      // y在控制垂直滚动条的位置
      y:0,
    }
  }
})

// 导航:路由发生了变化
// 守卫:看门的(函数)  只要路由发生了变化就会执行回调函数  控制能否跳转到某个路由或者跳转到别的路由
// 分类: 1.全局的 2.路由独享 3.单个组件
// 全局的:管得宽 只要是在这个项目当中有路由跳转 就会执行全局守卫
// 路由独享:只有经过某个路由时才会触发守卫函数(之后讲)
// 单个组件:只有经过某个路由组件才会触发的守卫函数(之后讲)

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // to 要去的那个路由对象
  // from 来时的那个路由对象
  // next 放行函数
  //      next() 无条件放行
  //      next(false) 不放行
  //      next('/c') next({path:'/c'})  强制跳转到c路由
  console.log('全局前置守卫执行了',to, from)
  // next()
  // next(false)
  // next('/search')

  next()
})

export default router