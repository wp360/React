import React from 'react';
import {connect} from 'react-redux';
import NavHeader from 'component/NavHeader/NavHeader';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="category">
        <NavHeader title="分类" />
      </div>
    );
  }
}

export default connect()(Main);