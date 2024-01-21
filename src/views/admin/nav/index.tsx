import React from 'react';
import { Menu } from 'antd';
import './index.scss';
import { Link } from 'react-router-dom';

const menuList = [
  {
    label: '控制台',
    key: '/home',
  },
  {
    label: '商品管理',
    key: '/comm',
    children: [
      {
        label: <Link to="/admin/findComm">商品详情</Link>,
        key: 'findcomm',
      },
      {
        label: <Link to="/admin/addComm">添加商品</Link>,
        key: 'addComm',
      },
    ],
  },
  {
    label: '订单管理',
    key: '/order',
    children: [
      {
        label: <Link to="/admin/orderDet">订单详情</Link>,
        key: 'detail',
      },
      {
        label: '结束订单',
        key: 'finish',
      },
    ],
  },
  {
    label: '权限设置',
    key: '/permission',
  },
];

const Nav: React.FC = () => {
  return (
    <div className="nav-left">
      <div className="logo">
        <h3>后台管理系统</h3>
      </div>
      <Menu className="text" mode="inline" theme="light" items={menuList} style={{ fontSize: 16 }} />
    </div>
  );
};

export default Nav;
