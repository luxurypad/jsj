import React, { useContext, useState } from 'react'
import { Avatar, Popover, Menu, Modal } from 'antd'
import { UserTokenContext } from '../store/UserToken'
import SignIn from './SignIn'
import SignUp from './SignUp'

function handleClick2(e, userInfoDispatch) {
  console.log('click', e)
  if (e.key === 'signOut') {
    userInfoDispatch({ type: 'remove' })
  }
}
function handleClick1(e, setVisible, setTitle,setVisible2, setTitle2) {
  switch (e.key) {
    case 'signIn':
      setTitle('登陆')
      setVisible(true)
      break
    case 'signUp':
      setTitle2('注册')
      setVisible2(true)
      break
    default:
      break
  }
}


export default function AvatarPopover(props) {
  //获取userinfo
  const [userInfo, userInfoDispatch] = useContext(UserTokenContext)
  //设置登陆、注册等窗口显示状态
  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)
  //设置窗口titile状态
  const [title, setTitle] = useState('')
  const [title2, setTitle2] = useState('')

  //登陆后的
  const signInContent = (
    <div>
      <Menu mode="inline" onClick={(e) => { handleClick2(e, userInfoDispatch) }} style={{ border: 'none' }} selectable={false}>
        <Menu.Item>修改密码</Menu.Item>
        <Menu.Item key='signOut'>注销</Menu.Item>
      </Menu>
    </div>
  )
  //未登录的
  const guestContent = (
    <div>
      <Menu mode="inline" onClick={(e) => { handleClick1(e, setVisible, setTitle,setVisible2, setTitle2) }} style={{ border: 'none' }} selectable={false}>
        <Menu.Item key='signIn'>登陆</Menu.Item>
        <Menu.Item key='signUp'>注册</Menu.Item>
      </Menu>
    </div>
  )
  return (
    <>
      {/* 气泡浮窗 */}
      <Popover content={userInfo.username ? signInContent : guestContent} title={userInfo.username} placement="bottom">
        <Avatar icon='user' style={userInfo.username ? { background: '#87d068' } : {}}></Avatar>
      </Popover>
      {/* 弹出对话框 */}
      <Modal visible={visible} title={title} footer={null} onCancel={() => {setVisible(false)}}>
        <SignIn setVisible={setVisible}></SignIn>
      </Modal>
      <Modal visible={visible2} title={title2} footer={null} onCancel={() => {setVisible2(false)}}>
        <SignUp setVisible={setVisible2}></SignUp>
      </Modal>
    </>
  )
}