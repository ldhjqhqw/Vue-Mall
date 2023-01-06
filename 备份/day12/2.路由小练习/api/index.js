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
// 这个函数专门用来搜索商品的
export const reqSearchGoods =(searchParmas)=>ajax({url:'/list',method:'post',data:searchParmas})
// 这个函数专门用来请求商品详情
export const reqGoodsDetail=(skuId)=>ajax({url:`/item/${ skuId }`,method:'get'})
// 这个函数是添加购物车的(也可以对购物车当中某个商品的已有数量进行操作)
export const reqAddShopcart=(skuId,skuNum)=>ajax({url:`/cart/addToCart/${ skuId }/${ skuNum }`,method:'post'})
// 这个函数专门用来获取购物车列表
export const reqShopcartList=()=>ajax({url:'/cart/cartList',method:'get'})
// 这个函数用来更新单个商品的选中状态
export const reqUpdateSomeChecked=(skuId,isChecked)=>ajax({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})
// 这个函数用来修改多个商品的选中状态
export const reqUpdateAllChecked=(isChecked,skuIdList)=>ajax({url:`/cart/batchCheckCart/${isChecked}`,method:'post',data:skuIdList})
// 这个函数用来删除单个商品
export const reqDeleteSome=(skuId)=>ajax({url:`/cart/deleteCart/${skuId}`,method:'delete'})
// 这个函数用来删除已选中的商品
export const reqDeleteChecked=(skuIdList)=>ajax({url:'/cart/batchDeleteCart',method:'post',data:skuIdList})
// 这是获取手机验证码的
export const reqCode=(phone)=>ajax({url:`/user/passport/sendCode/${phone}`,method:'get'})
// 这是注册用户的
export const reqRegisterUser=(paramsObj)=>ajax({url:'/user/passport/register',method:'post',data:paramsObj})
// 这是用户的登录的
export const reqLogin = (paramsObj)=>ajax({url:'/user/passport/login',method:'post',data:paramsObj})
// 这是获取用户信息的
export const reqUserInfo=()=>ajax({url:'/user/passport/auth/getUserInfo',method:'get'})
// 这是退出登录的
export const reqLogout=()=>ajax({url:'/user/passport/logout',method:'get'})
// 这是获取交易页信息
export const reqTradeInfo=()=>ajax({url:'/order/auth/trade',method:'get'})
// 这是获取用户地址信息的
export const reqUserAdressList=()=>ajax({url:'/user/userAddress/auth/findUserAddressList',method:'get'})
// 这是提交订单
export const reqSubmitOrder =(tradeNo,orderInfo)=>ajax({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,method:'post',data:orderInfo})
// 这是获取支付信息
export const reqPayInfo=(orderId)=>ajax({url:`/payment/weixin/createNative/${orderId}`,method:'get'})
// 这是获取支付状态的
export const reqPayStatus =(orderId)=>ajax({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})
// 这是获取我得订单列表的
export const reqMyOrderList=(page,limit)=>ajax({url:`/order/auth/${page}/${limit}`,method:'get'})