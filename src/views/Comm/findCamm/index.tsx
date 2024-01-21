import React, { useEffect, useState } from 'react';
import { EditOutlined, EllipsisOutlined, DeleteOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Row, message } from 'antd';
import { findComm, deleteComm } from '../../../api/comm';

export default function FindComm(props: any) {
  const [messageApi, contextHolder] = message.useMessage();
  interface comminfe {
    name: string;
    comment: string;
    is_valid: boolean;
    picture: string;
    price: number;
    rawMaterial: Array<Object>;
    sales: number;
    spec: Array<string>;
    _id: string;
  }

  const [commData, setComm] = useState<Array<comminfe>>([]);
  const { Meta } = Card;
  useEffect((): any => {
    console.log('1');
    findComm().then(data => {
      const comm = data.data;
      console.log(comm);
      setComm(comm.reverse());
    });
  }, []);

  const DeleteComm = async (id: any) => {
    try {
      await deleteComm(id);
      const nweCommData = commData.filter(item => item._id !== id);
      setComm(nweCommData);
      messageApi.open({
        type: 'success',
        content: '删除成功',
      });
    } catch (err) {
      messageApi.open({
        type: 'error',
        content: '删除失败',
      });
    }
  };

  return (
    <Row gutter={16}>
      {contextHolder}
      {commData.map(item => (
        <Col span={24 / 5} key={item._id}>
          <Card
            hoverable
            style={{ width: 300 }}
            cover={<img alt="example" src={item.picture[0] !== '' ? item.picture : 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'} />}
            actions={[<DeleteOutlined key="Delete" onClick={() => DeleteComm(item._id)} />, <EditOutlined key="edit" />, <EllipsisOutlined key="edit" />]}
          >
            <p>名称：{item.name}</p>
            <p>价格：{item.price} 元</p>
            <p>本月销量：{item.sales}</p>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
