import React, { createContext, useReducer, useEffect } from 'react'
import { API_CONFIG } from '../config/api'

export const UserTokenContext = createContext()

export default function UserToken(props) {
  const [userInfo, userInfoDispatch] = useReducer(reducer, { username: '', token: '' }, init)
  //渲染前更新headers，保证异步网络请求的头信息正确
  API_CONFIG.headers.Authorization = userInfo.token

  return (
    <>
      <UserTokenContext.Provider value={[userInfo, userInfoDispatch]}>
        {props.children}
      </UserTokenContext.Provider>
    </>
  )
}
//定义reducer函数
function reducer(state, action) {
  switch (action.type) {
    case 'update':
      return update(action.payload)
    case 'remove':
      return remove()
    default:
      throw new Error()
  }
}
//初始化函数
function init() {
  return JSON.parse(localStorage.getItem('user_info') || '{"username":"","token":""}')
}
//update函数
function update(payload) {
  localStorage.setItem('user_info', JSON.stringify(payload))  //同时更新本地存储
  return payload
}
//remove函数
function remove() {
  localStorage.removeItem('user_info') //同时删除本地存储
  return { username: '', token: '' }
}