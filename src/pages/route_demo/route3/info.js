import React from 'react'

export default class Info extends React.Component{
  render() {
    return(
      <div>
        信息页
        {this.props.match.params.value}
      </div>
    )
  }
}
