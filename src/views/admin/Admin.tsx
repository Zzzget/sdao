import React from 'react';
import { Row, Col } from 'antd';
import Header from './Header';
import Footer from './Footer';
import Nav from './nav';
import './common.scss';
import { Outlet, Router } from 'react-router-dom';

export default class Admin extends React.Component {
  render() {
    return (
      <div>
        <Row className="container">
          <Col span={3} className="nav-left">
            <Nav></Nav>
          </Col>
          <Col span={21}>
            <Header></Header>
            <div className="lishi"></div>
            <Outlet />
            <Footer></Footer>
          </Col>
        </Row>
      </div>
    );
  }
}
