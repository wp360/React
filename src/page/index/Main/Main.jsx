import 'component/common.scss';
import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';
import Home from '../Home/Home';
import Order from '../Order/Order';
import My from '../MY/My';
import BottomBar from '../BottomBar/BottomBar';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Route exact path="/home" component={Home}/>
        <Route path="/order" component={Order}/>
        <Route path="/my" component={My}/>
        <BottomBar/>
      </div>
    );
  }
}

export default withRouter(connect()(Main));