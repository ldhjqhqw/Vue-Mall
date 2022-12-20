// 一模块就是一个对象(小的store对象)

export default {
  state:{
    a:1,
    b:2,
    name:'zs'
  },
  mutations:{
    // 每一个模块接收的state都是自己模块的(小store)
    FN1(state){
      console.log('FN1执行了')
    }
  },
  actions:{
    // context是自己模块的store对象  mini版本(小store)
    fn1(context){
      console.log('fn1执行了')
    }
  },
  getters:{
    // 每一个模块接收的state都是自己模块的(小store)
    newA(state){
      return state.a*10
    }
  }
}