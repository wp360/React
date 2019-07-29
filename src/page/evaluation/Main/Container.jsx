import React from 'react';
import Main from './Main';
// react-hot-loader 不会刷新整个页面，它只替换了修改的代码，做到了页面的局部刷新。
import {hot} from 'react-hot-loader';

class Container extends React.Component {
  render() {
    return <Main />;
  }
}

export default hot(module)(Container);