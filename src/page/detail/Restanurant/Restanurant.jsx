import './Restanurant.scss';
import React from 'react';
import {connect} from 'react-redux';

class Restanurant extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="restanurant">
        商家
      </div>
    );
  }
}

export default connect()(Restanurant);