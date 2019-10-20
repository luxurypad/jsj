import React, { useState, useEffect, useReducer } from 'react'
import { Table, Divider, Tag, Spin, Button, Input, Icon, Modal } from 'antd';
import useFetch from '../hooks/useFetch'
import SignUp from './SignUp'

const initialRequest = { uri: '/api/users', method: 'GET', unique: Symbol(), params: [{}] }

function reducer(state, action) {
  const { type, payload } = action
  switch (type) {
    case 'GET':
      return { uri: '/api/users', method: 'GET', unique: Symbol(), params: payload }
    case 'DELETE':
      return { uri: '/api/users', method: 'DELETE', unique: Symbol(), params: payload }
    case 'PATCH':
      return { uri: '/api/users', method: 'PATCH', unique: Symbol(), params: payload }
    default:
      break;
  }
}
function init(initialRequest) {
  return initialRequest
}

export default function UserTable() {
  const [request, requestDispatch] = useReducer(reducer, initialRequest, init)
  const { isLoading, response } = useFetch(request)
  const [data, setData] = useState([])

  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  const [visible,setVisible]=useState(false)
  const [title,setTitle]=useState('新增账号')

  const [values,setValues]=useState(null)

  useEffect(() => {
    if (!!response && response.method === 'GET' && response.result.n > 0) {
      setData(response.data)
    }
    if (!!response && ['POST', 'DELETE'].some((v, i, array) => v === response.method && response.result.n > 0)) {
      requestDispatch({ type: 'GET', payload: [{}] })
    }
    if (!!response && ['PUT', 'PATCH'].some((v, i, array) => v === response.method && response.result.nModified > 0)) {
      requestDispatch({ type: 'GET', payload: [{}] })
    }
  }, [!!response])

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys)
      setSelectedRows(selectedRows)
    },
    getCheckboxProps: record => (
      {
        disabled: record.username === 'admin',
        name: record.username
      }
    )
  }

  function handleUpdateEmail() {
    requestDispatch({ type: 'PATCH', payload: [{ _id: { $in: selectedRowKeys } }, { $set: { email: 'maqin@icloud.com' } }] })
  }

  function getColumnSearchProps(dataIndex) {
    return {
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => {
              confirm()
            }}
            icon="search"
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            搜索
        </Button>
          <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
            重置
        </Button>
        </div>
      ),
      filterIcon: filtered => (
        <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) => record.username.toString().toLowerCase().includes(value.toLowerCase())

    }
  }


  const columns = [
    {
      title: 'id',
      dataIndex: '_id'
    },
    {
      title: '用户名',
      dataIndex: 'username',
      filters: [
        {
          text: 'luxu',
          value: 'luxu'
        },
        {
          text: 'lu',
          value: 'lu'
        },
        {
          text: 'adm',
          value: 'adm'
        },
        {
          text: 'a3',
          value: 'a3'
        }
      ],

      sorter: (a, b) => a.username.length - b.username.length,
      render: (username) => <a>{username}</a>,
      ...getColumnSearchProps('username')
      // onFilter: (value, record) => record.username.indexOf(value) >= 0,
      // key: 'username',
      // render: (username, record) => <a>{username}<Divider type='vertical' />{record.key}</a>,
    },
    {
      title: '密码',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },

    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={() => {
            setValues({username:record.username,password:record.password,email:record.email})  
            setVisible(true)
            }}>修改</a>
          <Divider type="vertical" />
          <a onClick={() => { requestDispatch({ type: 'DELETE', payload: [{ _id: record.key }] }) }}>删除</a>
        </span>
      ),
    },
  ]

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        {/* <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading}> */}
        <Button type="primary" disabled={selectedRowKeys.length < 1} onClick={handleUpdateEmail}>
          更新邮箱
          </Button>
        <span style={{ marginLeft: 8 }}>
          {/* {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''} */}
          {/* {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''} */}
          选中了{selectedRowKeys.length}项
        </span>
        <Button type='primary' onClick={()=>{setVisible(true)}}>新增记录</Button>
      </div>

      <Spin spinning={isLoading}>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data.map((v, i, array) => ({ key: v._id, ...v }))} />
      </Spin>
      <Modal visible={visible} title={title} footer={null} onCancel={() => { setVisible(false) }}>
        <SignUp visible={visible}  setVisible={setVisible} requestDispatch={requestDispatch} values={values}/>
      </Modal>
    </>
  )
}
