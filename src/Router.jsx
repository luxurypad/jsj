import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import GlobalModal from './store/GlobalModal'

import Home from './pages/home/Home'
import News from './pages/news/News'
import Users from './pages/users/Users'
import SignUp from './compontens/SignUp'
import SignIn from './compontens/SignIn'
import FeedbackResult from './pages/feedbackResult/FeedbackResult'
import UserTable from './compontens/UserTable'
import Test from './compontens/test'
import Template from './pages/template'

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <GlobalModal>
          <Switch>
            <Route path='/test'>
              <UserTable />
              {/* <Test /> */}
            </Route>
            <Route path='/users' >
              {/* <Users /> */}
              <Template />
            </Route>
            <Route path='/news' >
              <Template />
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/login" exact>
              <SignIn />
            </Route>
            <Route path="/:code" exact>
              <FeedbackResult />
            </Route>
            <Redirect to="/404"></Redirect>
          </Switch>
        </GlobalModal>
      </BrowserRouter>
    </>
  )
} 