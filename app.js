require('./index.scss');

// ES5
// var React = require('react');
// var ReactDom = require('react-dom');

// ES6 React
import React from 'react';
import ReactDom from 'react-dom';
// 引入组件
import Header from './Header/Header';
import Footer from './Footer/Footer';

ReactDom.render(
  <div>
    <Header />
    <Footer />
  </div>,
  document.getElementById('root')
);

console.log('webpack');