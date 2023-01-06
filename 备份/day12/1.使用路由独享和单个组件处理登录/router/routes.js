import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
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
      if(from.path.indexOf('/shopcart')!==-1){ 
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