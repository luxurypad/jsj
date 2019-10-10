import React, { useContext, useState, useReducer } from 'react'
import { Avatar,  Menu,  Dropdown } from 'antd'
import { UserTokenContext } from '../store/UserToken'
import {GlobalModalContext} from '../store/GlobalModal'

function handleMenuClick(e,contentDispatch, userInfoDispatch) {
  switch (e.key) {
    case 'signIn':
      contentDispatch({ type: 'signIn'})
      break;
    case 'signUp':
      contentDispatch({ type: 'signUp'})
      break;
    case 'signOut':
      userInfoDispatch({ type: 'remove' })
      break;
    default:
      throw new Error()
  }
}

export default function (props) {
  const [userInfo, userInfoDispatch] = useContext(UserTokenContext)
  const {contentDispatch} = useContext(GlobalModalContext)

  const SignInMenu = (
    <Menu onClick={(e) => { handleMenuClick(e, contentDispatch,userInfoDispatch) }}>
      <Menu.Item key='1'><span style={{color:'#409EFF'}}>{userInfo.username}</span></Menu.Item>
      <Menu.Item key='2'>修改密码</Menu.Item>
      <Menu.Item key='signOut'>注销</Menu.Item>
    </Menu>
  )

  const SignUpMenu = (
    <Menu onClick={(e) => { handleMenuClick(e,  contentDispatch, userInfoDispatch) }}>
      <Menu.Item key='signIn'>登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;陆</Menu.Item>
      <Menu.Item key='signUp'>注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</Menu.Item>
      <Menu.Item>忘记密码</Menu.Item>
    </Menu>
  )
  return (
    <>
      <Dropdown overlay={userInfo.username ? SignInMenu : SignUpMenu} placement='bottomCenter'>
        <Avatar icon='user' style={userInfo.username ? { background: '#87d068' } : {}}></Avatar>
      </Dropdown>
    </>
  )
}