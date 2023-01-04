import {v4} from 'uuid'
// 这个函数专门处理用户的临时身份标识
export function getUserTempId(){
  // 临时身份标识注意点: 1.唯一不重复 2.不能随意发生变化

  // v4是一个函数 每调用一次这个函数就可以返回一个唯一不重复的值

  // 如果说用户第一次进来咱们网站 为他生成一个临时身份标识
  // 如果说用户不是第一进来 让他用之前第一次帮他生成的那个临时身份标识

  let userTempId = localStorage.getItem('userTempId')
  if(!userTempId){ //用户第一次来
    userTempId = v4()
    localStorage.setItem('userTempId',userTempId)
  }
  return userTempId
}

export function setToken(token){
  localStorage.setItem('token',token)
}

export function getToken(){
  return localStorage.getItem('token')
}

export function removeToken(){
  localStorage.removeItem('token')
}