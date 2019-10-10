import React from 'react'
import { Layout,Row,Col } from 'antd'

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
               
            </Col>
          </Row>
        </Content>
        <Footer></Footer>
      </Layout>
  )
}