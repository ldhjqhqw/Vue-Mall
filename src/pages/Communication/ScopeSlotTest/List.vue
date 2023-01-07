<template>
  <ul>
    <li v-for="(todo, index) in todos" :key="todo.id">
      <!-- 子组件传递todo数据给到父组件了 -->
      <slot :todo="todo" :index="index"></slot>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'List',
  props: {
    todos: Array
  }
}
</script>