<template>
  <div>
    小明的爸爸现在有{{money}}元
    
    <h2>不使用sync修改符</h2>
    <Child :money="money" @update:money="money = $event"></Child>
    
    <!-- 1.通过props把父组件数据给到子组件 -->
    <!-- 2.子组件接收数据并且使用 -->
    <!-- 3.父组件给子组件绑定一个自定义事件 -->
    <!-- 4.子组件在合适的时刻触发父组件给他绑定的自定义事件 并且传递最新数据 -->
    <!-- 5.父组件拿到子组件传递的最新数据 来去修改自己的数据 -->
    <!-- 6.父组件数据变化 传递给子组件的数据就是最新的 -->
  

    <h2>使用sync修改符</h2>
    <Child :money.sync="money"></Child>


    <h2>使用v-model修改符</h2>
    <Child2 :value="money" @input="money = $event"></Child2>
    <Child2 v-model="money"></Child2>
    <hr>

    <!-- sync修饰符和v-model 相同点 -->
    <!-- 功能一样 父子组件数据同步   本质实现方式是一样的 props+自定义事件 -->
    <!-- sync修饰符和v-model 差异点 -->
    <!-- 1.props和自定义事件名字是不同的 -->
    <!-- v-model 属性必须传value 自定义事件名字必须input -->
    <!-- sync 属性名任你写 自定义事件名字update:属性的名字 -->
    <!-- 2.使用场景不同 约定俗成 -->
    <!-- sync 如果子组件内部不是表单元素 -->
    <!-- v-model  如果子组件内部是表单元素-->
  </div>
</template>

<script type="text/ecmascript-6">
  import Child from './Child.vue'
  import Child2 from './Child2.vue'
  export default {
    name: 'SyncTest',
    components: {
      Child,
      Child2
    },
    data(){
      return {
        money:1000
      }
    }
  }
</script>
