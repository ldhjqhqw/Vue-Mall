// 一模块就是一个对象(小的store对象)

export default {
  state:{
    c:3,
    d:4,
    name:'ls'
  },
  mutations:{
    FN2(state){
      console.log('FN2执行了')
    }
  },
  actions:{
    fn2({commit}){
      console.log('fn2执行了')
    }
  },
  getters:{
    newC(state){
      return state.c*10
    } 
  }
}