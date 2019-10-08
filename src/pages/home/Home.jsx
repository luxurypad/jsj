import React, { useContext } from 'react'
// import { Redirect } from 'react-router-dom'
import { Layout, Row, Col, Modal} from 'antd'
import './Home.css'
import NavBar from '../../compontens/NavBar'
import { UserTokenContext} from '../../store/UserToken'

const { Header, Footer, Content } = Layout



export default function Home(props) {
 
  

  return (
    <Layout style={{ height: '100%', backgroundColor: 'rgba(0,0,0,0)' }}>
      <Header style={{ backgroundColor: 'rgba(255,255,255,1)' }}>
        
        <Row >
          <Col >
            <NavBar {...props}></NavBar>
          </Col>
        </Row>

      </Header>
      <Content>
        
      </Content>
      <Footer></Footer>
    </Layout>
  )
}