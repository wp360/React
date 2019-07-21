import React from 'react';
import './ContentList.scss';
import {connect} from 'react-redux';
import ListItem from './ListItem/ListItem.jsx';
import {getListData} from '../../../actions/contentListAction';
import Loading from 'component/Loading/Loading.jsx';
/**
 * @constructor <ContentList />
 * @description 附近商家列表
 */

class ContentList extends React.Component {
  constructor(props) {
    super(props);
    // 页面滚动初始值
    this.state = {
      isend: false
    };
    // 请求第一屏数据
    this.fetchData(this.page);
    // 记录当前页码
    this.page = 0;
  }

  onLoadPage() {
    let clientHeight = document.documentElement.clientHeight;
    let scrollHeight = document.body.scrollHeight;
    let scrollTop = document.documentElement.scrollTop;
    let proLoadDis = 30;

    if ((scrollTop + clientHeight) >= (scrollHeight - proLoadDis)) {
      // console.log(1);
      // let page = this.state.page;
      this.page ++;
      // 最多滚动3页
      if(this.page > 3) {
        this.setState({
          isend: true
        });
      } else {
        this.fetchData(this.page);
      }
    }
  }

  // 旧版本 componentWillMount
  UNSAFE_componentWillMount () {
    window.addEventListener('scroll', this.onLoadPage.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onLoadPage.bind(this));
  }

  fetchData(page) {
    this.props.dispatch(getListData(page));
  }

  renderItems() {
    let list = this.props.list;
    return list.map((item, index) => {
      return (
        <ListItem key={index} itemData={item}></ListItem>
      )
    });
  }

  render() {
    return (
      <div className="list-content">
        <h4 className="list-title">
          <span className="title-line"></span>
          <span>附近商家</span>
          <span className="title-line"></span>
        </h4>
        {this.renderItems()}
        <Loading isend={this.state.isend} />
      </div>
    )
  }
}

export default connect(state => ({list: state.contentListReducer.list}))(ContentList);