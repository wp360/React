import './Menu.scss';
import React from 'react';
import {connect} from 'react-redux';
import {getListData} from '../actions/menuAction';

/**
 * 点菜tab页面
 * @description <Menu />
 */
class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(getListData());
  }

  /**
   * 渲染左边的列表
   */
  renderLeft() {
    let list = this.props.listData.food_spu_tags || [];
    return list.map((item, index) => {
      let cls = 'left-item';
      return (
        <div className={cls} key={index}>
          <div className="item-text">
            {item.icon ? <img className="item-icon" src={item.icon} /> : null } {item.name}
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="menu-inner">
        <div className="left-bar">
          <div className="left-bar-inner">
            {this.renderLeft()}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state =>({
    listData: state.menuReducer.listData
  })
)(Menu);