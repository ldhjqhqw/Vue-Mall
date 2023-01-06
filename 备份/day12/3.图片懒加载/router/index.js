import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
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

// 全局前置守卫
router.beforeEach(async(to, from, next) => {
  // 盲取token及userInfo
  let token = store.state.user.token
  let userInfo = store.state.user.userInfo
  if(token){ //用户登录了
    if(to.path === '/login'){ //用户登录了还要去登录页面
      next('/') //去首页
    }else{ //用户登录了 但是去的不是登录页面
      // 看有没有用户信息
      if(userInfo.name){ //有用户信息
        next() //无条件放行
      }else{ //没有用户信息  自己发送请求获取用户信息
        try {
          await store.dispatch('getUserInfo')
          // 登录了 虽然没有用户信息  一定有了用户信息(自己请求用户信息成功)
          next()
        } catch (error) {
          // token过期了(失效了)
          // 不能让他拿旧的token去玩耍了  清除掉用户信息(token usernfo)  暂且不做 退出登录
          await store.dispatch('getLogout')
          // 让他重新登录 获取最新的token
          next('/login')
        }
      }
    }
  }else{ //用户没登录
    // /trade  /pay  /paysuccess  /center  /center/myorder  /center/grouporder  不能去
    if(to.path.indexOf('/trade') !== -1 || to.path.indexOf('/pay') !== -1 || to.path.indexOf('/center') !== -1){
      // 去这六个当中的某一个 让他去登录
      // 走在判断当中 to.path一定是想去而没去成的那个地址
      next('/login?wantpath='+to.path)
    }else{ //去的不是这六个  无条件放行
      next()
    }
  }
})
// 1.一打开页面 ( / ==> /home)  用户没登录
// 2. /home ==> /login  用户没登录
// 3. 用户登录 (/login ==> /home)  自己发送请求获取用户信息
// 4. 用户登录了 又去登录页面  去首页
// 5. home页面刷新 (/ ==> /home) 自己发送请求获取用户信息
// 6. /home ==> /search  有用户信息无条件放行的这次
// 7. search页面刷新 自己发送请求获取用户信息

export default router