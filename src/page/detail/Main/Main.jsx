import './Main.scss';
import React from 'react';
import {connect} from 'react-redux';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {1}
      </div>
    );
  }
}

export default connect()(Main);