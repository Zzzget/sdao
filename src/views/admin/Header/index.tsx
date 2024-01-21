import React from 'react';
import { AppstoreOutlined } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';
// import { getDate } from '../../utils/utils';
import './index.scss';

const items = [
  {
    key: 'meu1',
    icon: <AppstoreOutlined />,
    children: [
      {
        key: 'chi1',
        label: '个人中心',
      },
    ],
  },
];

export default function Header() {
  return (
    <div className="header">
      <div className="header-left">
        {/* <span>{getDate(new Date().getTime)}</span> */}
        <Space size={16} wrap>
          <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
        </Space>
      </div>
    </div>
  );
}
