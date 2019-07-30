import './Menu.scss';
import React from 'react';
import {connect} from 'react-redux';

class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="menu">
        菜单
      </div>
    );
  }
}

export default connect()(Menu);