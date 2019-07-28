import './Header.scss';
import React from 'react';
import {connect} from 'react-redux';
import {changeTab} from '../actions/headerAction';

/**
 * @constructor <Header />
 * @description 头部筛选
 */
class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  changeTab(key) {
    this.props.dispatch(changeTab({
      activeKey: key
    }));
  }

  /**
   * 渲染顶部默认tab
   */
  renderTabs() {
    let tabs = this.props.tabs;
    let array = [];
    for(let key in tabs) {
      let item = tabs[key];
      let cls = item.key + ' item'; // className
      if(item.key === this.props.activeKey) {
        cls+=' current';
      }
      array.push(
        <div className={cls} key={item.key} onClick={()=>this.changeTab(item.key)}>
          {item.text}
        </div>
      );
    }
    return array;
  }

  render() {
    return (
      <div className="header">
        <div className="header-top">
          {this.renderTabs()}
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  tabs: state.headerReducer.tabs,
  activeKey: state.headerReducer.activeKey
}))(Header);