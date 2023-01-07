// 混入本质就是一个对象 放组件选项(组件配置项)
// 作用:封装可复用功能
// 使用:组件

export default {
  data(){
    return {
      num:123
    }
  },
  methods: {
    giveMoney (money) {
      // 儿子钱要减 父亲钱要加
      this.money -= money
      // 获取父组件实例
      this.$parent.money += money
    }
  },
  mounted(){
    console.log('mixin当中的挂载')
  }
}