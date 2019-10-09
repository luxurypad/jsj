import React, { useState } from 'react'
import { Menu} from 'antd';
import { useHistory } from 'react-router-dom'
import useFetch from '../hooks/useFetch'

export default function NavBar({mode='horizontal'}) {
  //给与request初始值，组件初始化时就进行网络请求,请求导航树数据
  const [request] = useState({ uri: '/nav-tree', method: 'GET', unique:Symbol(), params: [{}] })
  const {response} = useFetch(request)
  const history = useHistory()
  //递归算法
  function f(navData) {
    return navData.map((v, i, a) => {
      if (!v.children) {
        return <Menu.Item key={v.key} disabled={v.disabled}>{v.title}</Menu.Item>
      }
      return <Menu.SubMenu title={v.title} key={v.key} disabled={v.disabled} onTitleClick={(e) => { history.push(e.key) }}>{f(v.children)}</Menu.SubMenu>
    })
  }

  return (
    <>
      <Menu mode={mode} onClick={(e) => { history.push(e.key) }} theme="light" style={{ lineHeight: '60px' }}>
        {f(response ? response.result : [])}
      </Menu>
    </>
  )
}