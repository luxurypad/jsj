import React, { useState, useEffect } from 'react'
import { message } from 'antd'
/*
参数：object
参数格式：{
  uri:String
  method:Array 值['GET','POST','DELETE','PATCH','PUT']
  params:Array [{第1个参数},{第2个参数}...] //mongodb 查询方式
  unique:Symbol //唯一标识 1.区分不同网络请求 2.避免副作用无限循环
}
--------------------------------------------------------------
返回值：object
返回值格式：{
  isLoading:Bool,
  response:Object,
  error:Object
}
*/

//Fetch全局变量
// export const hostname = 'http://127.0.0.1:4000'
export const hostname = 'http://luxu.site:4000'
export const headers = {
  'content-type': 'application/json',
  'Authorization': ''
}

//定义useFetch
export default function useFetch({ uri, method, params, unique }) {
  //设置网络请求响应状态
  const [responseState, setResponseState] = useState({ isLoading: false, response: null, error: null })
  //调和fetch参数
  const fetchRequestParameterArray = [
    { method: 'GET', fetchParameter: [hostname + uri + '?g=' + JSON.stringify(params), { method, headers }] },
    { method: 'DELETE', fetchParameter: [hostname + uri + '?d=' + JSON.stringify(params), { method, headers }] },
    { method: 'POST', fetchParameter: [hostname + uri, { method, headers, body: JSON.stringify(params) }] },
    { method: 'PATCH', fetchParameter: [hostname + uri, { method, headers, body: JSON.stringify(params) }] },
    { method: 'PUT', fetchParameter: [hostname + uri, { method, headers, body: JSON.stringify(params) }] },
  ]

  //这里通过unique作为uesEffect的dependents,这样才能保证一个请求只请求一次，而不会在重新渲染时循环执行
  useEffect(() => {

    //若没有传入网络请求参数，则直接返回,不继续进行网络请求
    if ([uri, method, params, unique].some((v, i, array) => typeof v === 'undefined')) {
      return
    }

    //获取调和后的参数
    const fetchRequestParameter = fetchRequestParameterArray.find((v, i, obj) => v.method === method)

    //状态为loading
    setResponseState({ isLoading: true, response: null, error: null })

    console.log('Trigger network request',new Date())

    //请求数据
    fetch(...fetchRequestParameter.fetchParameter).then((response) => {
      response.json().then((value) => {
        //异步更新状态
        setResponseState({ isLoading: false, response: value, error: null })
      }, (error) => {
        setResponseState({ isLoading: false, response: null, error: error })
      })
    }, (error) => {
      setResponseState({ isLoading: false, response: null, error: error })
    })
  }, [unique])

  //定义全局加载、错误提示网络请求状态副作用
  useEffect(() => {
    if (responseState.isLoading) {
      message.loading('Request in progress...')
    } else if (responseState.error) {
      message.error('Request failed')
    }
    return () => {
      //再次触发message提示时，清除上次还未结束的message
      message.destroy()
    }
  }, [responseState.isLoading,!!responseState.error])
  return responseState
}  