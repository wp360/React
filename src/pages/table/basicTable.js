import React from 'react'
import {Card, Table} from 'antd'
import axios from 'axios'

export default class BasicTable extends React.Component{
  // 初始值
  state = {
    dynamicData: []
  };
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

    // 调用请求
    this.request()
  }

  // 动态获取mock数据
  request = () => {
    let baseUrl = 'https://www.easy-mock.com/mock/5d99a991896b9432186c1e7f/bikeapi'
    axios.get(baseUrl + '/table/list').then((res) => {
      // console.log(JSON.stringify(res))
      if(res.status === '200' && res.data.code === 0) {
        this.setState({
          dynamicData: res.data.result
        })
      }
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
        <Card title="动态数据渲染表格" style={{margin: '10px 0'}}>
          <Table bordered  dataSource={this.state.dynamicData} columns={columns} pagination={false} />
        </Card>
      </div>
    )
  }
}
