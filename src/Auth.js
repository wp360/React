import React from 'react'
import { connect } from 'react-redux'
import {
  login,
  getUserData
} from './Auth.redux'
import { Redirect } from "react-router-dom"
import { Button } from 'antd-mobile'

@connect(
  state => state.auth,
  {
    login,
    getUserData
  }
)

class Auth extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     data: {}
  //   }
  // }
  componentDidMount() {
    this.props.getUserData()
    // axios.get('/data').then((res) => {
    //   console.log(res.data)
    //   if(res.status === 200) {
    //     this.setState({
    //       data: res.data
    //     })
    //   }
    // })
  }
  render() {
    return (
      <div>
        <h2>我的名字{this.props.user}， 身份{this.props.type}</h2>
        {this.props.isAuth ? <Redirect to="/dashboard" /> : null}
        <h2>你没有权限， 需要登录才能看</h2>
        <Button type="primary" onClick={this.props.login}>登录</Button>
      </div>
    )
  }
}

export default Auth