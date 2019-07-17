import React from 'react';
import './Category.scss';
import axios from 'axios';
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
    axios({
      method: 'get',
      url: '/json/head.json'
    }).then((resp)=>{
      this.props.dispatch(getHeaderData(resp.data));
    });
  }

  renderItems() {
    let items = this.props.items;
    return items.map((item,index)=> {
      return <div>{item.name}</div>
    });
  }

  render() {
    return (
      <div className="categoey-content">
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