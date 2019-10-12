import React from 'react'
import Router from './Router'
import UserToken from './store/UserToken'

import './assets/css/base.css'
import 'antd/dist/antd.css'

function App() {
  return (
    <>
      <UserToken>
        <Router />
      </UserToken>
    </>
  )
}
export default App;
