import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'

// import Search from '@/pages/Search'

// const Search = ()=>{
//   // 只有需要显示Search组件时 才会执行这个函数
//   return import('@/pages/Search')
// }

const Search = ()=> import('@/pages/Search')

import Test from '@/pages/Test'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'
export default [
  {
    path: '/communication',
    component: () => import('@/pages/Communication/Communication'),
    children: [
      {
        path: 'pubsub',
        component: () => import('@/pages/Communication/PubsubTest/PubsubTest'),
        meta: {
          isHideFooter: true
        },
       },
      {
        path: 'event',
        component: () => import('@/pages/Communication/EventTest/EventTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'model',
        component: () => import('@/pages/Communication/ModelTest/ModelTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'sync',
        component: () => import('@/pages/Communication/SyncTest/SyncTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'attrs-listeners',
        component: () => import('@/pages/Communication/AttrsListenersTest/AttrsListenersTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'children-parent',
        component: () => import('@/pages/Communication/ChildrenParentTest/ChildrenParentTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'scope-slot',
        component: () => import('@/pages/Communication/ScopeSlotTest/ScopeSlotTest'),
        meta: {
          isHideFooter: true
        },
      }
    ],
  },
  {
    path:'/center',
    component:Center,
    children:[
      {
        // path:'/center/myorder',
        path:'myorder',
        component:MyOrder
      },
      {
        path:'grouporder',
        component:GroupOrder
      },
      {
        path:'',
        redirect:'myorder'
      }
    ]
  },
  {
    path:'/paysuccess',
    component:PaySuccess
  },
  {
    path:'/pay/:orderId?',
    component:Pay,
    // 路由独享
    beforeEnter: (to, from, next) => {
      // 如果是从trade而来那就放行 不是从购物车而来不放行
      if(from.path.indexOf('/trade')!==-1){ 
        next()
      }else{
        next(false)
      }
    }
  },
  {
    path:'/trade',
    component:Trade,
    // 路由独享
    beforeEnter: (to, from, next) => {
      // 如果是从购物车而来那就放行 不是从购物车而来不放行
      if(from.path.indexOf('/shopcart')!==-1||from.path.indexOf('/login')!==-1||from.path=='/'){ 
        next()
      }else{
        next(false)
      }
    }
  },
  {
    path:'/shopcart',
    component:ShopCart
  },
  {
    path:'/addcartsuccess',
    component:AddCartSuccess
  },
  {
    path:'/detail/:skuId',
    component:Detail
  },
  {
    path:'/test',
    component:Test
  },
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
    path:'/search/:keyword?',
    component:Search,
    name:'search',
    // props(route){
    //   return {
    //     keyword:route.params.keyword,
    //     keyword1:route.query.keyword1
    //   }
    // }
    props:(route)=>({...route.params,...route.query})
  },
  {
    path:'/',
    redirect:'/home'
  }
]