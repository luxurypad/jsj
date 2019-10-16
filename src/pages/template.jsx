import React, { } from 'react'
import NavBar from '../compontens/NavBar'
import UserTable from '../compontens/UserTable'
import SignUp from '../compontens/SignUp'
import News from '../pages/news/News'
import {Route} from 'react-router-dom'

export default function Template(props) {
  return (
    <>
      <div>
        <NavBar />
      </div>
      <div>
        <Route path='/users' exact>
          <UserTable />
        </Route>
        <Route path='/sign-up'>
          <SignUp />
        </Route>
        <Route path='/news'>
          <News />
        </Route>
      </div>
    </>
  )
}