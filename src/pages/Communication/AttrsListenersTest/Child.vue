<template>
  <div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: 'Child',
    props:['a'],
    mounted(){
      // $attrs获取父给子传递的属性数组所组成的一个对象
      // 注意点:1.如果props接收的属性数据 那么不会再出现再$attrs中了
      //        2.style以及class不会出现再$attrs中
      // $listeners获取父给子绑定的事件所组成的一个对象
      console.log(this.$attrs,this.$listeners)
    }
  }
</script>
