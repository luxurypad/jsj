import React, { useContext } from 'react'
import { GlobalModalContext } from '../../store/GlobalModal'
import { Result, Button } from 'antd'
import { useHistory, useParams } from 'react-router-dom'


export default function SignUpSuccess(props) {
  const history = useHistory()
  const { code } = useParams()
  const { contentDispatch } = useContext(GlobalModalContext)

  let [status, title, subTitle, extra] = ['', '', '', '']

  function handleClick(e, action) {
    switch (action) {
      case 'signIn':
        history.push('/')
        contentDispatch({type:'signIn'})
        break;
      case 'signUp':
        history.push('/')
        contentDispatch({type:'signIn'})
        break;
      case 'cancel':
        history.push('/')
        break
      default:
        break;
    }
  }

  switch (code) {
    case '404':
      [status, title, subTitle, extra] = [
        '404',
        '404',
        '访问的页面不存在',
        <Button type='primary' onClick={() => { history.push('/') }}>返回首页</Button>
      ]
      break
    case '201':
      [status, title, subTitle, extra] = [
        'success',
        '密码修改成功',
        '',
        [
          <Button type="primary" key='signIn' onClick={(e) => { handleClick(e, 'signIn') }} >登录</Button>,
          <Button type="primary" key='cancel' onClick={(e) => { handleClick(e, 'cancel') }} >取消</Button>
        ]
      ]
      break
    case '202':
      [status, title, subTitle, extra] = [
        'success',
        '注册成功',
        '',
        [
          <Button type="primary" key='signIn' onClick={(e) => { handleClick(e, 'signIn') }} >登录</Button>,
          <Button type="primary" key='cancel' onClick={(e) => { handleClick(e, 'cancel') }} >取消</Button>
        ]
      ]
      break

    default:
      history.push('/404')
      break;
  }

  // const params = useParams()
  // console.log(params)
  // const { contentDispatch } = useContext(GlobalModalContext)

  // function handleClick(e, action) {
  //   switch (action) {
  //     case 'signIn':
  //       contentDispatch({ type: 'signIn' })
  //       break;
  //     case 'cancel':
  //       contentDispatch({ type: 'hidden' })
  //     default:
  //       break;
  //   }
  // }   

  return (
    <Result
      status={status}
      title={title}
      subTitle={subTitle}
      extra={extra}
    />
  )
}