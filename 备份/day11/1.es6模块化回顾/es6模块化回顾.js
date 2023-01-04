
// 暴露方式 1.分别暴露 2.统一暴露 3.默认暴露
// 无论使用的是那种暴露方式 本质都是暴露出去一个对象

// 分别暴露
// export let a = 1
// export let b = {}
// 暴露出去对象的样子
// {
//   a:1,
//   b:{}
// }
// 引入
// import {a} from 'xxx.js'
// import * as obj from './es6模块化回顾'

// 统一暴露
// let a = 1
// let b = {}
// export {
//   a,
//   b
// }
// 暴露出去对象的样子
// {
//   a,
//   b
// }


// 默认暴露
let a = 1
let b = {}
export default {
  a,
  b
}
// 暴露出去对象的样子
// {
//   default:{
//     a,
//     b
//   }
// }