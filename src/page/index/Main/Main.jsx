import React from 'react';
import {connect} from 'react-redux';
import Home from '../Home/Home';
import BottomBar from '../BottomBar/BottomBar';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Home/>
        <BottomBar/>
      </div>
    );
  }
}

export default connect()(Main);