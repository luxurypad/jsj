import React from 'react'
import { Layout,Row,Col } from 'antd'

import LoginForm from '../../compontens/LoginForm'
import NavBar from '../../compontens/NavBar'
import './Login.css'

const { Header, Footer, Content } = Layout

export default (props) => {
  return (
      <Layout className="login-layout">
        <Header style={{backgroundColor:'rgb(255,255,255)'}}>
          <NavBar {...props} ></NavBar>
        </Header>
        <Content className="login-content">
          <Row type="flex" justify="center" align="middle" style={{height:'100%'}}>
            <Col span={6} style={{}}>
              <LoginForm {...props} ></LoginForm> 
            </Col>
          </Row>
        </Content>
        <Footer></Footer>
      </Layout>
  )
}