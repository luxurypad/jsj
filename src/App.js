import React from 'react'
import Router from './Router'
import UserToken from './store/UserToken'
import GlobalModal from './store/GlobalModal'

import './assets/css/base.css'
import 'antd/dist/antd.css'

function App() {
  return (
    <>
      <UserToken>
        <GlobalModal>
          <Router />
        </GlobalModal>
      </UserToken>
    </>
  )
}
export default App;
