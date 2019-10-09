import React, { useEffect, useReducer } from 'react'
import { Form, Input, Icon, Button, Spin, message } from 'antd';
import useFetch from '../hooks/useFetch'

function reducer(state, action) {
  const { username, password, email } = action.payload
  switch (action.type) {
    case 'getUser':
      return { uri: '/users', method: 'GET', unique: Symbol(), params: [{ username }] }
    case 'addUser':
      return { uri: '/users', method: 'POST', unique: Symbol(), params: [[{ username, password, email }]] }
    default:
      throw new Error()
  }
}


function SignUp(props) {
  const { getFieldDecorator, getFieldValue, getFieldsValue, setFields, validateFields, resetFields } = props.form
  const [request, requestDispatch] = useReducer(reducer, {})
  const { isLoading, response } = useFetch(request)


  useEffect(() => {
    if (!!response && Array.isArray(response.result)) {
      if (response.result.length > 0) {
        message.error('账号重复，请重新输入')
        setFields({
          username: {
            value: getFieldValue('username'),
            errors: [new Error('账号已被占用')]
          }
        })

      } else {
        const { username, password, email } = getFieldsValue()
        requestDispatch({ type: 'addUser', payload: { username, password: btoa(password), email } })
      }

    } else if (!!response && response.result.n === 1) {
      message.success('注册成功')
      resetFields()
    }
  }, [!!response])

  //提交动作
  function handleSubmit(e) {
    e.preventDefault()
    validateFields((err, values) => {
      if (!err) {
        const { username } = values
        //开始进行网络请求，发出查询请求，后续插入用户操作自动完成
        requestDispatch({ type: 'getUser', payload: { username } })
      }
    })
  }

  //校验第一次输入密码
  function compareToFirstPassword(rule, value, callback) {
    if (value !== getFieldValue('password') && !!value) {
      callback('两次输入密码不一致')
    } else {
      callback()
    }
  }
  //触发校验
  function validateToNextPassword(rule, value, callback) {
    if (!!value && !!getFieldValue('confirm')) {
      validateFields(['confirm'], { force: true })
    }
    callback()
  }

  return (

    // <div style={{ width: '350px', backgroundColor: 'rgba(255,255,255,1)', margin: '100px', padding: '10px' }}>
    <div>
      <Spin spinning={isLoading}>
        <Form onSubmit={handleSubmit} >
          <Form.Item  >
            {getFieldDecorator('username', {
              rules: [
                { required: true, message: '请输入用户名' },
                { pattern: /^[a-zA-Z](?=.{3,12})\w*$/, message: '[a-zA-Z]开头,[a-zA-Z0-9_]长度4-13' },
              ],
              validateTrigger: ['onChange']
            })(<Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='用户名' />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: '请输入正确的邮箱格式',
                },
              ],
            })(<Input prefix={<Icon type='mail' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='E-mail' />)}
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请输入密码',
                },
                { pattern: /^(?=.{6,16})(?=.*\d+.*)(?=.*[a-z]+.*).*$/, message: '至少包含数字和字母，长度6-16位' },
                {
                  validator: validateToNextPassword,
                },
              ],
            })(<Input.Password prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='登陆密码' />)}
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: '请再次输入密码',
                },
                {
                  validator: compareToFirstPassword,
                },
              ],
            })(<Input.Password prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='确认密码' />)}
          </Form.Item>
          <Form.Item >
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              注册
          </Button>
            <Button type="primary" onClick={() => { resetFields() }} style={{ width: '100%' }}>
              重置
          </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div >
  )
}

export default Form.create()(SignUp)