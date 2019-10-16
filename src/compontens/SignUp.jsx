import React, { useEffect, useReducer, useContext } from 'react'
import { Form, Input, Icon, Button, Spin, message } from 'antd';
import useFetch from '../hooks/useFetch'
import { GlobalModalContext } from '../store/GlobalModal'
import { useHistory } from 'react-router-dom'

//网络请求状态dispatch
function reducer(state, action) {
  const { type, payload: { username, password, email } } = action
  switch (type) {
    case 'getUser':
      return { uri: '/api/users', method: 'GET', unique: Symbol(), params: [{ username }] }
    case 'addUser':
      return { uri: '/api/users', method: 'POST', unique: Symbol(), params: [[{ username, password, email }]] }
    default:
      throw new Error()
  }
}

function SignUp(props) {
  const { contentDispatch } = useContext(GlobalModalContext)
  const history = useHistory()

  const [request, requestDispatch] = useReducer(reducer, {})
  const { isLoading, response } = useFetch(request)
  //antd API
  const { getFieldDecorator, getFieldValue, getFieldsValue, setFields,setFieldsValue ,validateFields, resetFields } = props.form

  //测试表格中传过来的值
  
  useEffect(()=>{
    setFieldsValue({...props.values})
  },[props.visible])


  //网络请求副作用及后续处理
  useEffect(() => {
    if (!!response && response.method === 'GET') {
      if (response.result.n > 0) {
        message.error('账号重复，请重新输入')
        //手动设置username字段错误
        setFields({
          username: {
            value: getFieldValue('username'),
            errors: [new Error('账号已被占用')]
          }
        })
      } else {
        //解构获取表单字段值
        const { username, password, email } = getFieldsValue()
        //验证全部通过后插入用户记录
        requestDispatch({ type: 'addUser', payload: { username, password: btoa(password), email } })
      }
    } else if (!!response && request.method === 'POST' && response.result.n === 1) {
      message.success('注册成功')
      resetFields()
      //隐藏界面
      if (typeof props.setVisible === 'undefined') {
        contentDispatch({ type: 'hidden' })
      }else{
        // props.setVisible(false)
        // if(props.values){
        //   console.log(props.values)
        //  setFieldsValue({
        //   username:props.values.username
        //  }) 
        // }
        props.requestDispatch({type:'GET',payload:[{}]})
      }

      //跳转登陆
      // contentDispatch({type:'signUpSuccess'})
      //  history.push('/202') 

    }
  }, [!!response])

  //提交动作
  function handleSubmit(e) {
    e.preventDefault()
    validateFields((err, values) => {
      if (!err) {
        //开始网络请求流程，发出查询请求，后续插入用户操作自动完成
        requestDispatch({ type: 'getUser', payload: { username: values.username } })
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
              validateTrigger: ['onChange'],
              
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