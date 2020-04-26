import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import thunk from 'redux-thunk';
import {
  counter,
  add,
  reduce,
  addAsync
} from './index.redux';

// const store = createStore(counter, applyMiddleware(thunk));
const store = createStore(counter, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <App store={store} add={add} reduce={reduce} addAsync={addAsync} />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

render()

store.subscribe(render)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
