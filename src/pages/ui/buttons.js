import React from 'react'
import {Button, Card, Icon, Radio} from 'antd'
import './ui.less'

export default class Buttons extends React.Component {
  state = {
    loading: true,
    value: 'default'
  }
  // 关闭按钮
  // handleCloseLoading() {
  //   this.setState({
  //     loading: false
  //   });
  // }
  handleCloseLoading = () => {
    this.setState({
      loading: false
    });
  }

  // radio单选按钮
  onChange = e => {
    // console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value
    })
  }

  render() {
    return(
      <div>
        <Card title="基础按钮" className="card-wrap">
          <Button type="primary">主按钮</Button>
          <Button>普通按钮</Button>
          <Button type="dashed">虚线按钮</Button>
          <Button type="danger">删除按钮</Button>
          <Button disabled>禁用按钮</Button>
        </Card>
        <Card title="图形按钮" className="card-wrap">
          <Button icon="plus">创建</Button>
          <Button icon="edit">编辑</Button>
          <Button icon="delete">删除</Button>
          <Button shape="circle" icon="search"></Button>
          <Button type="primary" icon="search">搜索</Button>
          <Button type="primary" icon="download">下载</Button>
        </Card>
        <Card title="Loading按钮" className="card-wrap">
          <Button type="primary" loading={this.state.loading}>确定</Button>
          <Button type="primary" shape="circle" loading={this.state.loading}></Button>
          <Button loading={this.state.loading}>点击加载</Button>
          <Button shape="circle" loading={this.state.loading}></Button>
          {/* this.handleCloseLoading.bind(this) */}
          <Button type="primary" onClick={this.handleCloseLoading}>关闭</Button>
        </Card>
        <Card title="按钮组">
          <Button.Group>
            <Button type="primary"><Icon type="left" />返回</Button>
            <Button type="primary">前进<Icon type="right" /></Button>
          </Button.Group>
        </Card>
        <Card title="按钮尺寸" className="card-wrap">
          <Radio.Group onChange={this.onChange} value={this.state.value}>
            <Radio value="small">小</Radio>
            <Radio value="default">中</Radio>
            <Radio value="large">大</Radio>
          </Radio.Group>
          <Button type="primary" size={this.state.value}>主按钮</Button>
          <Button size={this.state.value}>普通按钮</Button>
          <Button type="dashed" size={this.state.value}>虚线按钮</Button>
          <Button type="danger" size={this.state.value}>删除按钮</Button>
        </Card>
      </div>
    );
  }
}
