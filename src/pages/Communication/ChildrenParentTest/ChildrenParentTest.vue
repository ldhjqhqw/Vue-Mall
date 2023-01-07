<template>
  <div>
    <h2>BABA有存款: {{money}}</h2>
    <button @click="moneyFromXm(100)">找小明借钱100</button><br>
    <button @click="moneyFromXh(150)">找小红借钱150</button><br>
    <button @click="moneyFromXmAndXh(200)">找所有孩子借钱200</button><br>
    
    <br>
    <Son ref="son"/>

    <br>
    <Daughter ref="dau"/>
  </div>
</template>

<script>
import Son from './Son'
import Daughter from './Daughter'

export default {
  name:'ChildrenParentTest',
  data () {
    return {
      money: 1000
    }
  },
  methods: {
    moneyFromXm(money){
      // 父组件的钱要加 儿子组件的钱要减
      this.money += money
      // this.$refs.son获取到的是son组件实例
      this.$refs.son.money -= money
    },
    moneyFromXh(money){
      this.money += money
      this.$refs.dau.money -= money
    },
    moneyFromXmAndXh(money){
      this.money += money*2
      // $children可以获取到某个组件的所有子组件实例  但是顺序是没有办法保证的
      this.$children.forEach(item=>{
        item.money -= money
      })
    }
  },
  components: {
    Son,
    Daughter
  }
}
</script>

<style>

</style>
