import './Main.scss';
import React from 'react';
import {connect} from 'react-redux';
import NavHeader from 'component/NavHeader/Navheader';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  renderTabs() {
    let tabs = this.props.tabs;
    return tabs.map((item) => {
      return (
        <div className="tab-item active" key={item.key}>{item.name}</div>
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
      </div>
    );
  }
}

export default connect(
  state => ({
    tabs: state.tabReducer.tabs
  })
)(Main);