import React from 'react'
import {Card, Table} from 'antd'

export default class BasicTable extends React.Component{
  // 初始值
  state = {};
  componentDidMount() {
    const dataSource = [
      {
        id: '0',
        userName: 'Bob',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2000-01-01',
        address: '上海市浦东新区',
        time: '08:00'
      },
      {
        id: '1',
        userName: 'Jack',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '1988-08-08',
        address: '上海市普陀区',
        time: '07:00'
      },
      {
        id: '2',
        userName: 'Paul',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2001-01-01',
        address: '上海市虹口区',
        time: '09:00'
      }
    ]
    this.setState({
      dataSource
    })
  }
  render() {
    const columns = [
      {
        title: 'id',
        dataIndex: 'id'
      },
      {
        title: '用户名',
        dataIndex: 'userName'
      },
      {
        title: '性别',
        dataIndex: 'sex'
      },
      {
        title: '状态',
        dataIndex: 'state'
      },
      {
        title: '爱好',
        dataIndex: 'interest'
      },
      {
        title: '生日',
        dataIndex: 'birthday'
      },
      {
        title: '地址',
        dataIndex: 'address'
      },
      {
        title: '早起时间',
        dataIndex: 'time'
      }
    ]
    return (
      <div>
        <Card title="基础表格">
          <Table bordered  dataSource={this.state.dataSource} columns={columns} pagination={false} />
        </Card>
      </div>
    )
  }
}
