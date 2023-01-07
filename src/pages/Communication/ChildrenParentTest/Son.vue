<template>
  <div style="background: #ccc; height: 50px;">
    <h1>{{ num }}</h1>
    <h3>儿子小明: 有存款: {{money}}</h3>
    <button @click="giveMoney(50)">给BABA钱: 50</button>
  </div>
</template>

<script>
// 引入混入对象
import moneyMixin from './mixins/moneyMixin.js'
export default {
  name: 'Son',
  // 使用混入对象
  mixins:[moneyMixin],
  data () {
    return {
      money: 30000,
      num:234, //如果混入对象当中的数据和组件的数据冲突了 组件的优先级高
    }
  },
  // 如果混入有生命周期组件也有 都执行 混入先执行
  mounted(){
    console.log('组件中的挂载')
  }
  // methods: {
  //   giveMoney(money){
  //     // 儿子钱要减 父亲钱要加
  //     this.money -= money
  //     // 获取父组件实例
  //     this.$parent.money += money
  //   }
  // }
}
</script>
