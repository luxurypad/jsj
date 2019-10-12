import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import GlobalModal from './store/GlobalModal'

import Home from './pages/home/Home'
import News from './pages/news/News'
import Users from './pages/users/Users'
import SignUp from './compontens/SignUp'
import SignIn from './compontens/SignIn'
import FeedbackResult from './pages/feedbackResult/FeedbackResult'

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <GlobalModal>
          <Switch>
            <Route path='/sign-up'>
              <SignUp />
            </Route>
            <Route path='/users' exact>
              <Users />
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