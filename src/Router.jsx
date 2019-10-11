import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Error from './pages/Error/Error'
// import Test from './pages/Test/Test'
import News from './pages/news/News'
// import UploadJson from './compontens/UploadJson'
import Users from './pages/users/Users'
import SignUp from './compontens/SignUp'
import SignIn from './compontens/SignIn'

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path='/sign-up'>
            <SignUp />
          </Route>
          <Route path='/users' exact>
            <Users/>
          </Route>
          <Route path='/news' exact>
            <News />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login" exact>
            <SignIn />
          </Route>
          <Route path="/404" exact>
            <Error />
          </Route>
          <Redirect to="/404"></Redirect>
        </Switch>
      </BrowserRouter>
    </>
  )
} 