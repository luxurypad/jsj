import React, { useState, useEffect } from 'react'


export default function (props) {
  const [n, setN] = useState(0)
  
  useEffect(()=>{  
    for(let i=0;i<10000;i++){
      console.log('aaa')
    }
  })

  useEffect(()=>{
    console.log(1)
  })


  return (
    <>
      <div>
        计数：{n}
        <button onClick={()=>{setN(n+1)}}>+</button>
        <button onClick={()=>{setN(n-1)}}>-</button>
      </div>
    </>
  )
}