import React from 'react';
import { Row, Col } from 'antd';
import NavLeft from './components/NavLeft';
import Header from './components/Header';
import Footer from './components/Footer';

export default class Admin extends React.Component {
  render() {
    return(
      <div>
          <Row>
            <Col span={3}>
              <NavLeft/>
            </Col>
            <Col span={21}>
              <Header/>
              <Row>
                内容
              </Row>
              <Footer/>
            </Col>
          </Row>
        </div>
    )
  }
}
