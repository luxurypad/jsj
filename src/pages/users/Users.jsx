import React, { useState } from 'react'
import NavBar from '../../compontens/NavBar'
import useFetch from '../../hooks/useFetch'

export default function (props){
  const [request,setRequest]=useState({})
  const {response}=useFetch(request)
  return (
    <div>
      <NavBar />
      <div><button onClick={()=>{setRequest({uri:'/api/users',method:'GET',unique:Symbol(),params:[{}]})}}>查询所有用户信息</button> </div> 
      <div>{JSON.stringify(response)}</div>
    </div>
  )
}