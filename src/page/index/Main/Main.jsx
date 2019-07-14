import React from 'react';
import {connect} from 'react-redux';
import {addTodo} from '../actions/tabAction';
import BottomBar from '../BottomBar/BottomBar.jsx';

class Main extends React.Component {
  constructor(props) {
    super(props);
    // this.props.num;
  }

  click() {
    this.props.dispatch(addTodo({
      num: 10
    }));
  }

  render() {
    let num = this.props.num;
    return (
      <div>
        <div onClick={()=>this.click()}>{num}</div>
        <BottomBar/>
      </div>
    );
  }
}

export default connect(
  state => ({
    num: state.tabReducer.num
  })
)(Main);