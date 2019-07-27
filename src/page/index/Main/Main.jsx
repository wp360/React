import React from 'react';
import {connect} from 'react-redux';
// import Home from '../Home/Home';
// import Order from '../Order/Order';
import My from '../MY/My';
import BottomBar from '../BottomBar/BottomBar';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      /* <Home /><Order /> */
      <div>
        <My/>
        <BottomBar/>
      </div>
    );
  }
}

export default connect()(Main);