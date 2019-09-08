import React from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'
import Main from './Main'
import About from './../route1/about'
import Topics from './../route1/topic'
import Home from './Home'

export default class IRouter extends React.Component{
  render() {
    return(
      <Router>
        <Home>
          <Route path="/main" render={()=>
            <Main>
              <Route path="/main/a" component={About} />
            </Main>
          }></Route>
          <Route path="/about" component={About} />
          <Route path="/topics" component={Topics} />
        </Home>
      </Router>
    )
  }
}
