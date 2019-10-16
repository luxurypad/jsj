import React, { } from 'react'
import {useParams,useLocation,useRouteMatch} from 'react-router-dom'
import NavBar from '../../compontens/NavBar'


export default function (props){
  let params=useParams()
   
  return (
    <div>
      <h2>这是新闻页面{params.id}</h2>
    </div>
  )
}