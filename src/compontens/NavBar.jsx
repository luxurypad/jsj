import React, { useState} from 'react'
import { Menu,  Row, Col } from 'antd';
import AvatarPopover from '../compontens/AvatarPopover'
import { useHistory } from 'react-router-dom'
import useFetch from '../custom-hooks/useFetch'


export default function NavBar(props) {
  const [request, setRequest] = useState({ uri: '/nav-tree', method: 'GET', timestamp: Date.now(), requestData: [{}] })
  const { isLoading, response, error } = useFetch(request)
  const history = useHistory()

  function f(navData) {
    return navData.map((v, i, a) => {
      if (!v.children) {
        return <Menu.Item key={v.key} disabled={v.disabled}>{v.title}</Menu.Item>
      }
      return <Menu.SubMenu title={v.title} key={v.key} disabled={v.disabled} onTitleClick={(e)=>{history.push(e.key)}}>{f(v.children)}</Menu.SubMenu>
    })
  }

  return (
    <Row >
      <Col span={23}>
        <Menu mode="horizontal" onClick={(e)=>{history.push(e.key)}} theme="light" style={{ lineHeight: '60px' }}>
          {f(response ? response.result : [])}
        </Menu>
      </Col>
      <Col span={1}>
        <AvatarPopover />
      </Col>
    </Row>
  )
}