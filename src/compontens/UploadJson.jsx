import React, {useState } from 'react'
import useFetch from '../custom-hooks/useFetch'
import jsonData from '../navTree'



export default function UploadJson(props) {
  const [request, setRequest] = useState({})
  const { isLoading, response, error } = useFetch(request)  

  return (
    <div>

      <button onClick={()=>{setRequest({ method: 'POST', uri: '/nav-tree', timestamp: Date.now(), requestData: [jsonData] })}}>上传</button>
      <div>{JSON.stringify(response)}</div>

    </div>
      )
}