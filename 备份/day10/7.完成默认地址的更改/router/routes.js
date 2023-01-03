import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Test from '@/pages/Test'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
export default [
  {
    path:'/trade',
    component:Trade
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