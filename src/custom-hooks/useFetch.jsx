import React, { useState, useEffect } from 'react'
import { message} from 'antd'
/*
参数：object
参数格式：{
  uri:String
  method:['GET','POST','DELETE','PATCH','PUT']
  requestData:[{第1个参数},{第2个参数}...] //mongodb 查询方式
  timestamp:Number //事件邮戳
}
返回值：object
返回值格式：{
  isLoading:Bool,
  response:Object,
  error:Object
}
*/

//配置网络请求全局变量
export const hostname = 'http://127.0.0.1:4000'
export const headers = {
  'content-type': 'application/json',
  'Authorization': ''
}

export default function useFetch({ uri, method, requestData, timestamp }) {
  //设置网络请求响应状态
  const [responseState, setResponseState] = useState({ isLoading: false, response: null, error: null })

  //调配各类请求方式的fetch参数
  const fetchRequestParameterArray = [
    { method: 'GET', fetchParameter: [hostname + uri + '?g=' + JSON.stringify(requestData), { method, headers }] },
    { method: 'DELETE', fetchParameter: [hostname + uri + '?d=' + JSON.stringify(requestData), { method, headers }] },
    { method: 'POST', fetchParameter: [hostname + uri, { method, headers, body: JSON.stringify(requestData) }] },
    { method: 'PATCH', fetchParameter: [hostname + uri, { method, headers, body: JSON.stringify(requestData) }] },
    { method: 'PUT', fetchParameter: [hostname + uri, { method, headers, body: JSON.stringify(requestData) }] },
  ]

  //这里通过timestamp作为uesEffect的dependents,这样才能保证一个请求只请求一次，而不会在重新渲染时循环执行
  useEffect(() => {

    //若没有传入网络请求参数，则直接返回,不继续进行网络请求
    if (typeof uri === 'undefined' || typeof method === 'undefined' || typeof timestamp === 'undefined') {
      return
    }

    //状态为loading
    // setIsLoading(true)
    setResponseState({ isLoading: true, response: null, error: null })

    const fetchRequestParameter = fetchRequestParameterArray.find((v, i, obj) => v.method === method)

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

  }, [timestamp])

  //定义全局加载、错误提示网络请求状态副作用
  useEffect(()=>{
    if(responseState.isLoading){
      message.loading('Request in progress...')
    }else if(responseState.error){
      message.error(responseState.error.message)
    }
    return ()=>{
      //再次触发message提示时，清除上次还未结束的message
      message.destroy()
    }
  },[responseState.isLoading])


  return responseState
}  