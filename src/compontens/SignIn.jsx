import React, { useContext, useState, useEffect } from 'react'
import { Form, Icon, Input, Button, message, Spin } from 'antd';
import useFetch from '../hooks/useFetch'
import { UserTokenContext } from '../store/UserToken'
import { GlobalModalContext } from '../store/GlobalModal'

function SignIn(props) {
  const [userInfo, userInfoDispatch] = useContext(UserTokenContext)
  const { contentDispatch } = useContext(GlobalModalContext)

  const [request, setRequest] = useState({})
  const { isLoading, response } = useFetch(request)

  const { getFieldDecorator, validateFields, resetFields } = props.form

  //副作用处理网络请求响应
  useEffect(() => {
    if (!!response && response.result.n === 1) {
      message.success('登陆成功')
      //更新全局store用户信息
      userInfoDispatch({ type: 'update', payload: { username: response.data[0].username, token: response.data[0].token } })
      //隐藏界面
      contentDispatch({ type: 'hidden' })
    } else if (response) {
      message.error('用户名或密码错误')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!response])

  function handleSubmit(e) {
    //阻止默认提交
    e.preventDefault()
    //校验所有字段是否符合规则
    validateFields((errors, values) => {
      if (errors) {
        message.error('用户名和密码不符合规则')
      } else {
        setRequest({ method: 'GET', uri: '/api/users', unique: Symbol(), params: [{ username: values.username, password: btoa(values.password) }] })
      }
    })
  }
  return (
    <div>
      <Spin spinning={isLoading}>
        <Form onSubmit={handleSubmit}>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [
                { required: true, message: '用户名不能为空' },
                { pattern: /^[a-zA-Z](?=.{3,12})\w*$/, message: '[a-zA-Z]开头,[a-zA-Z0-9_]长度4-13' },
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
              ]
            })(<Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="请输入密码"
            />)}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              登陆
          </Button>
            <Button type="primary" onClick={() => { resetFields() }} style={{ width: '100%' }}>
              重置
          </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  )
}
export default Form.create()(SignIn)