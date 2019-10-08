import React, { useContext, useState } from 'react'
import { Avatar, Popover, Menu, Modal } from 'antd'
import { UserTokenContext } from '../store/UserToken'
import LoginForm from './LoginForm'

function handleClick2(e, userInfoDispatch) {
  console.log('click', e)
  if (e.key === 'signOut') {
    userInfoDispatch({ type: 'remove' })
  }
}
function handleClick1(e, setVisible, setTitle) {
  switch (e.key) {
    case 'signIn':
      setTitle('登陆')
      setVisible(true)
      break
    case 'signUp':
      setTitle('注册')
      setVisible(true)
      break
    default:
      break
  }
}


export default function AvatarPopover(props) {
  const [userInfo, userInfoDispatch] = useContext(UserTokenContext)
  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')

  const signInContent = (
    <div>
      <Menu mode="inline" onClick={(e) => { handleClick2(e, userInfoDispatch) }} style={{ border: 'none' }} selectable={false}>
        <Menu.Item>修改密码</Menu.Item>
        <Menu.Item key='signOut'>注销</Menu.Item>
      </Menu>
    </div>
  )
  const guestContent = (
    <div>
      <Menu mode="inline" onClick={(e) => { handleClick1(e, setVisible, setTitle) }} style={{ border: 'none' }} selectable={false}>
        <Menu.Item key='signIn'>登陆</Menu.Item>
        <Menu.Item key='signUp'>注册</Menu.Item>
      </Menu>
    </div>
  )
  return (
    <>
      <Popover content={userInfo.username ? signInContent : guestContent} title={userInfo.username} placement="bottom">
        <Avatar icon='user' style={userInfo.username ? { background: '#87d068' } : {}}></Avatar>
      </Popover>
      <Modal visible={visible} title={title} footer={null} onCancel={() => {setVisible(false)}}>
        <LoginForm setVisible={setVisible}></LoginForm>
      </Modal>
    </>
  )
}