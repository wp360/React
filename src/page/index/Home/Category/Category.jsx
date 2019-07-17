import React from 'react';
import './Category.scss';
import {connect} from 'react-redux';
import {getHeaderData} from '../../actions/categoryAction';
/**
 * @constructor <Category />
 * @description 外卖类别
 */

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.fetchData();
  }

  fetchData() {
    this.props.dispatch(getHeaderData());
  }

  renderItems() {
    let items = this.props.items;
    items = items.splice(0,8);
    return items.map((item,index)=> {
      return (
        <div key={index} className="category-item">
          <img className="item-icon" src={item.url} />
          <p className="item-name">{item.name}</p>
        </div>
      )
    });
  }

  render() {
    return (
      <div className="category-content clearfix">
        {this.renderItems()}
      </div>
    )
  }
}

export default connect(
  state=> ({
    items: state.categoryReducer.items
  })
)(Category);