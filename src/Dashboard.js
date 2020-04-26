import React from 'react'
// 路由
import {
  Route,
  Link,
  Redirect
} from "react-router-dom"
import { connect } from 'react-redux'
import App from './App'
import { logout } from './Auth.redux'
import { Button } from 'antd-mobile'

function About() {
  return <h1>关于</h1>
}

function Topics() {
  return <h1>主题</h1>
}

@connect(
  state => state.auth,
  {logout}
)

class Dashboard extends React.Component {
  // constructor(props) {
  //   super(props)
  // }
  render() {
    // console.log(this.props)
    const match = this.props.match
    console.log(match)
    const redirectToLogin = <Redirect to='/login'></Redirect>
    const app = (
      <div>
        <h1>首页</h1>
        {this.props.isAuth ? <Button type="primary" onClick={this.props.logout}>注销</Button> : null}
        <ul>
          <li>
            {/* "/dashboard/" */}
            <Link to={`${match.url}/`}>Home</Link>
          </li>
          <li>
            <Link to={`${match.url}/about`}>About</Link>
          </li>
          <li>
            <Link to={`${match.url}/topics`}>Topics</Link>
          </li>
        </ul>
        <Route path="/dashboard/" exact component={App}></Route>
        <Route path="/dashboard/about" component={About}></Route>
        <Route path="/dashboard/topics" component={Topics}></Route>
      </div>
    )
    return this.props.isAuth ? app : redirectToLogin
  }
}

export default Dashboard