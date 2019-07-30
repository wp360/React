import './Comment.scss';
import React from 'react';
import {connect} from 'react-redux';

class Comment extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="comment">
        评论
      </div>
    );
  }
}

export default connect()(Comment);