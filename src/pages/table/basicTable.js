import React from 'react'
import {Card, Table, Modal} from 'antd'
// import axios from 'axios'
// 使用封装的axios
import axios from './../../axios/index'

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
    dataSource.map((item, index) => item.key = index)
    this.setState({
      dataSource
    })

    // 调用请求
    this.request()
  }

  // 动态获取mock数据
  request = () => {
    // let baseUrl = 'https://www.easy-mock.com/mock/5d99a991896b9432186c1e7f/bikeapi'
    // axios.get(baseUrl + '/table/list').then((res) => {
    //   // console.log(JSON.stringify(res))
    //   if(res.status === '200' && res.data.code === 0) {
    //     this.setState({
    //       dynamicData: res.data.result
    //     })
    //   }
    // })
    axios.ajax({
      url: '/table/list',
      data: {
        params: {
          page: 1
        }
      }
    }).then((res) => {
      if(res.code === 0) {
        res.result.map((item,index) => item.key = index)
        this.setState({
          dynamicData: res.result
        })
      }
    })
  }

  // 点击事件
  onRowClick = (record, rowIndex) => {
    let selectKey = [rowIndex]
    Modal.info({
      title: '信息',
      content: `用户名：${record.userName}，用户爱好：${record.interest}`
    })
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record
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
        dataIndex: 'sex',
        render(sex){
          return sex === 1 ? '男' : '女'
        }
      },
      {
        title: '状态',
        dataIndex: 'state',
        render(state) {
          let config = {
            '1': '菜鸟',
            '2': '初级',
            '3': '中级',
            '4': '高级',
            '5': '专家'
          }
          return config[state]
        }
      },
      {
        title: '爱好',
        dataIndex: 'interest',
        render(interest) {
          let config = {
            '1': '阅读',
            '2': '影视',
            '3': '动漫',
            '4': '篮球',
            '5': '游泳',
            '6': '跑步',
            '7': '画画',
            '8': '唱歌'
          }
          return config[interest]
        }
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
    // const {selectedRowKeys} = this.state;
    const selectedRowKeys = this.state.selectedRowKeys;
    const rowSelection = {
      type: 'radio',
      selectedRowKeys
    }
    return (
      <div>
        <Card title="基础表格">
          <Table bordered dataSource={this.state.dataSource} columns={columns} pagination={false} />
        </Card>
        <Card title="动态数据渲染表格" style={{margin: '10px 0'}}>
          <Table bordered dataSource={this.state.dynamicData} columns={columns} pagination={false} />
        </Card>
        <Card title="Mock-单选" style={{margin: '10px 0'}}>
          <Table bordered rowSelection={rowSelection}
          onRow={(record,rowIndex) => {
              return {
                onClick: event => {
                  this.onRowClick(record, rowIndex)
                }
              }
            }
          }
          dataSource={this.state.dynamicData} columns={columns} pagination={false} />
        </Card>
      </div>
    )
  }
}
