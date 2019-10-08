import React, { useContext, useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Icon, Input, Button, message, Spin} from 'antd';
import useFetch from '../custom-hooks/useFetch'
import { UserTokenContext } from '../store/UserToken'

function LoginForm(props) {
  const [userInfo, userInfoDispath] = useContext(UserTokenContext)
  const [request, setRequest] = useState({})
  const { isLoading, response, error } = useFetch(request)

  const { getFieldDecorator, validateFields, getFieldsValue } = props.form

  function handleSubmit(e) {
    //阻止默认提交
    e.preventDefault()
    //校验所有字段是否符合规则
    validateFields((errors, values) => {
      if (errors) {
        message.error('用户名和密码不符合规则')
      } else {
        setRequest({ method: 'GET', uri: '/users', timestamp: Date.now(), requestData: [{ username: values.username, password: values.password }] })
      }
    })
  }

  console.log(isLoading, response, error)

  //副作用处理网络请求响应
  useEffect(() => {
    if (response) {
      if (response.result.length === 1) {
        message.success('登陆成功')
        userInfoDispath({ type: 'update', payload: { username: response.result[0].username, token: response.result[0].token } })
      } else {
        message.error('用户名或密码错误')
      }
    }
    return ()=>{
      props.setVisible(false)
    }
  }, [isLoading])

  if(userInfo.token){
    return (
      <>
      <Redirect to='/'/>
      </>
    )
  }

  return (
    <div style={{ width: 'auto'}}>
      <Spin spinning={isLoading}>
        <Form onSubmit={handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [
                { required: true, message: '用户名不能为空' },
                { pattern: /^[a-zA-Z](?=.{3,12})\w*$/, message: '[a-zA-Z]开头,[a-zA-Z0-9_]长度4-13' }
              ]
            })(<Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入用户名"
            />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: '密码不能为空' },
                // { pattern: /^(?=.{6,16})(?=.*\d+.*)(?=.*[a-z]+.*)(?=.*[A-Z]+.*).*$/, message: '数字/大写字母/小写字母长度6-16位' }
              ]
            })(<Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="请输入密码"
            />)}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%' }}>登陆</Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  )
}

export default Form.create()(LoginForm)