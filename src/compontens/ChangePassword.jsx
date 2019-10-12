import React, { useContext, useReducer, useEffect } from 'react'
import { Form, Input, Button, Icon, message, Spin } from 'antd'
import { UserTokenContext } from '../store/UserToken'
import { GlobalModalContext } from '../store/GlobalModal'
import useFetch from '../hooks/useFetch'
import { useHistory } from 'react-router-dom'

function reducer(state, action) {
  const { type, payload: { username, oldPassword, newPassword } } = action
  switch (type) {
    case 'validateUser':
      return { uri: '/users', method: 'GET', unique: Symbol(), params: [{ username, password: btoa(oldPassword) }] }
    case 'updateUser':
      return { uri: '/users', method: 'PATCH', unique: Symbol(), params: [{ username }, { $set: { password: btoa(newPassword) } }] }
    default:
      throw new Error()
  }
}

function ChangePassword(props) {
  const [userInfo, userInfoDispatch] = useContext(UserTokenContext)
  const { contentDispatch } = useContext(GlobalModalContext)
  const [request, requestDispatch] = useReducer(reducer, {})
  const { isLoading, response } = useFetch(request)
  const history = useHistory()

  const { getFieldDecorator, getFieldValue, getFieldsValue, validateFields, setFields, resetFields } = props.form

  useEffect(() => {
    if (!!response && response.method === 'GET') {
      if (response.result.n < 1) {
        message.error('原密码错误')
        setFields({
          oldPassword: {
            errors: [new Error('原密码错误')]
          }
        })
      } else {
        const { username, newPassword } = getFieldsValue()
        requestDispatch({ type: 'updateUser', payload: { username, newPassword } })
      }
    } else if (!!response && response.method === 'PATCH' && response.result.n === 1) {
      message.success('密码修改成功')
      resetFields()
      userInfoDispatch({ type: 'remove' })
      contentDispatch({ type: 'hidden' })
      history.push('/201')
      // contentDispatch({type:'signUpSuccess'})
    }
  }, [!!response])

  function handleClick(e) {
    e.preventDefault()
    validateFields((errors, values) => {
      if (errors) {
        message.error('用户名或密码不符合规则')
      } else {
        requestDispatch({ type: 'validateUser', payload: { username: values.username, oldPassword: values.oldPassword } })
      }
    })
  }

  function validateToNextPassword(rule, value, callback) {
    if (!!value && getFieldValue('newPassword2')) {
      validateFields(['newPassword2'], { force: true })
    }
    callback()
  }
  function compareToFirstPassword(rule, value, callback) {
    if (!!value && value !== getFieldValue('newPassword')) {
      callback('两次密码不一致')
    } else {
      callback()
    }

  }



  return (
    <>
      <div>
        <Spin spinning={isLoading}>
          <Form onSubmit={(e) => { handleClick(e) }} >
            <Form.Item>
              {getFieldDecorator('username', { initialValue: userInfo.username })(
                <Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='用户名' disabled />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('oldPassword', { rules: [{ required: true, message: '请输入密码' }] })(
                <Input.Password prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='原密码' />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('newPassword', {
                rules: [
                  { required: true, message: '请输入密码' },
                  { pattern: /^(?=.{6,16})(?=.*\d+.*)(?=.*[a-z]+.*).*$/, message: '至少包含数字和字母，长度6-16位' },
                  { validator: validateToNextPassword }
                ]
              })(
                <Input.Password prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='新密码' />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('newPassword2', {
                rules: [
                  { required: true, message: '请输入密码' },
                  { validator: compareToFirstPassword }
                ]
              })(
                <Input.Password prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='再次输入密码' />
              )}
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit' style={{ width: '100%' }} >确认</Button>
            </Form.Item>
          </Form>
        </Spin>
      </div>
    </>
  )
}

export default Form.create()(ChangePassword)