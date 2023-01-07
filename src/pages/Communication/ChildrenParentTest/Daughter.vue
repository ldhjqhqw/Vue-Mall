<template>
  <div style="background: #ccc; height: 50px;">
    <h3>女儿小红: 有存款: {{money}}</h3>
    <button @click="giveMoney(100)">给BABA钱: 100</button>
  </div>
</template>

<script>
// 引入混入对象
import moneyMixin from './mixins/moneyMixin.js'
export default {
  name:'Daughter',
  // 使用混入对象
  mixins:[moneyMixin],
  data () {
    return {
      money: 20000,
    }
  },
  // methods: {
  //   giveMoney(money){
  //     // 闺女钱要减 父亲钱要加
  //     this.money -= money
  //     // 获取父组件实例
  //     this.$parent.money += money
  //   }
  // }
}
</script>
