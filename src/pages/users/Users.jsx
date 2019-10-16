import React, { useState } from 'react'
import NavBar from '../../compontens/NavBar'
import useFetch from '../../hooks/useFetch'
import UserTable from '../../compontens/UserTable'

export default function (props) {
  const [request, setRequest] = useState({})
  const { response } = useFetch(request)
  return (
    <div>
      <NavBar />
      <UserTable />
    </div>
  )
}