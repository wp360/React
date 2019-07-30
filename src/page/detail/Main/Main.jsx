import './Main.scss';
import React from 'react';
import {connect} from 'react-redux';
import NavHeader from 'component/NavHeader/Navheader';
// 路由
import {Route, withRouter, NavLink} from 'react-router-dom';
// 组件
import Menu from '../Menu/Menu';
import Comment from '../Comment/Comment';
import Restanurant from '../Restanurant/Restanurant';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  changeTab() {

  }

  renderTabs() {
    let tabs = this.props.tabs;
    return tabs.map((item) => {
      return (
        <NavLink activeClassName="active" onClick={()=>this.changeTab(item)} replace={true} to={'/' + item.key} key={item.key} className="tab-item">{item.name}</NavLink>
      )
    })
  }

  render() {
    return (
      <div className="detail">
        <NavHeader title={'黄焖鸡'} />
        <div className="tab-bar">
          {this.renderTabs()}
        </div>
        <Route exact path="/menu" component={Menu}/>
        <Route path="/comment" component={Comment}/>
        <Route path="/restanurant" component={Restanurant}/>
      </div>
    );
  }
}

export default withRouter(connect(
  state =>({
    tabs: state.tabReducer.tabs
  })
)(Main));