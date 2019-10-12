import React, { useReducer, createContext } from 'react'
import { Modal } from 'antd'

import SignIn from '../compontens/SignIn'
import SignUp from '../compontens/SignUp'
// import SignUpSuccess from '../compontens/SignUpSuccess'
import ChangePassword from '../compontens/ChangePassword'

export const GlobalModalContext = createContext()

function reducer(state, action) {
  switch (action.type) {
    case 'signIn':
      return { visible: true, title: '登陆', content: <SignIn /> }
    case 'signUp':
      return { visible: true, title: '注册', content: <SignUp /> }
    // case 'signUpSuccess':
      // return { visible: true, title: '注册成功', content: <SignUpSuccess/> }
    case 'changePassword':
      return { visible: true, title: '修改密码', content: <ChangePassword/> }
    case 'hidden':
      return { visible: false, title: state.title, content: state.content }
    default:
      throw new Error()
  }
}

export default function GlobalModal(props) {
  const [{ visible, title, content }, contentDispatch] = useReducer(reducer, { visible: false, title: '', content: null })
  return (
    <>
      <GlobalModalContext.Provider value={{ contentDispatch }}>
        <Modal visible={visible} title={title} footer={null} onCancel={() => { contentDispatch({ type: 'hidden' }) }}>
          {content}
        </Modal>
        {props.children}
      </GlobalModalContext.Provider>
    </>
  )
}