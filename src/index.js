import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import Auth from './Auth';
import Dashboard from './Dashboard';
import * as serviceWorker from './serviceWorker';
import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
// import { counter } from './index.redux';
import reducers from './reducer';
// 路由
import {
  BrowserRouter,
  Route,
  // Link,
  Switch,
  Redirect
} from "react-router-dom";
// const store = createStore(counter, applyMiddleware(thunk));
// counter
const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));
console.log(store.getState())
// function About() {
//   return <h1>关于</h1>
// }

// function Topics() {
//   return <h1>主题</h1>
// }

// function Test() {
//   return <h1>404</h1>
// }

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/login" component={Auth}></Route>
            <Route path="/dashboard" component={Dashboard}></Route>
            <Redirect to="/dashboard"></Redirect>
          </Switch>
          {/*
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/topics">Topics</Link>
            </li>
          </ul>
          <Switch>
            <Route path="/" exact component={App}></Route>
            <Route path="/about" component={About}></Route>
            <Route path="/topics" component={Topics}></Route>
            <Route path="/:location" component={Test}></Route>
          </Switch>
          */}
        </div>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
