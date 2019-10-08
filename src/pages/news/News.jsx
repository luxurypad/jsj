import React, { } from 'react'
import {useParams,useLocation,useRouteMatch} from 'react-router-dom'
import NavBar from '../../compontens/NavBar'


export default function (props){
  let {id}=useParams()
  let location=useLocation()
  let match=useRouteMatch('/News/:id')
  console.log(match)
  console.log(location)
  return (
    <div>
      <NavBar />
      <h2>这是新闻页面{id}</h2>
    </div>
  )
}