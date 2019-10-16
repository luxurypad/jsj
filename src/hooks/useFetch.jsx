/*
参数：object
参数格式：{
  uri:String,
  method:String,  //'GET'||'POST'||'DELETE'||'PATCH'||'PUT'
  unique:Symbol   //用于唯一标识 1.区分不同网络请求 2.避免副作用无限循环
  params:Array,   //[第1个参数,第2个参数...] mongodb 查询方式
}
********************************************************************
返回值：object
返回值格式：{
  isLoading:Bool,
  response:Object,
  error:Object
}
*/
import { useState, useEffect } from 'react'
import { message } from 'antd'
import { API_CONFIG } from '../config/api'

//定义useFetch
export default function useFetch({ uri, method, params, unique }) {
  //配置文件获取最新全局变量值
  const { host, headers } = API_CONFIG
  //设置网络请求响应状态
  const [responseState, setResponseState] = useState({ isLoading: false, response: null, error: null })

  //这里通过unique作为uesEffect的dependents,这样才能保证一个请求只请求一次，而不会在重新渲染时循环执行
  useEffect(() => {
    //调和fetch请求参数
    let fetchParams = []
    if (['GET', 'DELETE'].some((v, i, arr) => v === method)) {
      fetchParams = [host + uri + '?q=' + JSON.stringify(params), { method, headers }]
    } else if (['POST', 'PATCH', 'PUT'].some((v, i, arr) => v === method)) {
      fetchParams = [host + uri, { method, headers, body: JSON.stringify(params) }]
    } else {
      return
    }

    //设置loading状态
    setResponseState({ isLoading: true, response: null, error: null })

    console.log('Trigger network request', uri, method, new Date())

    //请求数据
    fetch(...fetchParams).then((response) => {
      response.json().then((value) => {
        //异步获取响应状态
        setResponseState({ isLoading: false, response: value, error: null })
      }, (error) => {
        setResponseState({ isLoading: false, response: null, error: error })
      })
    }, (error) => {
      setResponseState({ isLoading: false, response: null, error: error })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unique])

  //定义全局加载、错误提示网络请求状态副作用

  useEffect(() => {
    if (responseState.error) {
      message.error('Request failed')
    }
    return () => {
      message.destroy()
    }
  }, [responseState.error]) 

  useEffect(() => {
    if (responseState.isLoading) {
      message.loading('Request in progress...')
    }
    return () => {
      message.destroy()
    }
  }, [responseState.isLoading]) 

  return responseState
}   

