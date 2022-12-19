import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
Vue.use(VueRouter)

export default new VueRouter({
  routes:[
    {
      path:'/home',
      component:Home
    },
    {
      path:'/login',
      component:Login,
      meta:{  //配置元数据
        isHidden:true
      }
    },
    {
      path:'/register',
      component:Register,
      meta:{  //配置元数据
        isHidden:true
      }
    },
    {
      path:'/search',
      component:Search
    },
    {
      path:'/',
      redirect:'/home'
    }
  ]
})