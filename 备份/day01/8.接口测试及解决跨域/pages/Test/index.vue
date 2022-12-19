<template>
  <div>
    <h1>这个组件咱们用来书写一些测试代码</h1>
    <button @click="test">点击按钮发送获取三级分类的请求</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Test',
  methods: {
    async test() {
      try {
        const res = await axios({
          url: '/api/product/getBaseCategoryList123',
          method: 'get',
        })
      } catch (error) {
        console.log(error,'error')
      }
    },
  },
}
</script>

<style scoped>
</style>
