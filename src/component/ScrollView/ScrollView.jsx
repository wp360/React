import './ScrollView.scss';
import React from 'react';
import Loading from 'component/Loading/Loading';
/**
 * <ScrollView loadCallback={function} isend={bool}/>
 * @description 滚动加载组件
 */

class ScrollView extends React.Component {
  onLoadPage() {
    let clientHeight = document.documentElement.clientHeight;
    let scrollHeight = document.body.scrollHeight;
    let scrollTop = document.documentElement.scrollTop;
    let proLoadDis = 30;

    if ((scrollTop + clientHeight) >= (scrollHeight - proLoadDis)) {
      if(!this.props.isend) {
        this.props.loadCallback && this.props.loadCallback();
      }
    }
  }

  // 旧版本 componentWillMount
  UNSAFE_componentWillMount() {
    window.addEventListener('scroll', this.onLoadPage.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onLoadPage.bind(this));
  }

  render() {
    return (
      <div className="scrollview">
        {this.props.children}
        <Loading isend={this.props.isend}/>
      </div>
    );
  }
}

export default ScrollView;