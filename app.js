require('./index.scss');

// ES5
// var React = require('react');
// var ReactDom = require('react-dom');

// ES6 React
import React from 'react';
import ReactDom from 'react-dom';

ReactDom.render(
  <h1>Hello,React!</h1>,
  document.getElementById('root')
);

console.log('webpack');