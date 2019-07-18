import React from 'react';
import Header from './Header/Header';
import Category from './Category/Category';
import ContentList from './Category/ContentList/ContentList';
/**
 * @constructor <Home />
 * @description 首页tab代码
 */

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header/>
        <Category/>
        <ContentList/>
      </div>
    )
  }
}

export default Home;