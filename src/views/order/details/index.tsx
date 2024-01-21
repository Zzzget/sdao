/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { Space, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getOrder, DeleteOrder, upDateOrder } from '../../../api/order';

function OrderDet() {
  const [messageApi, contextHolder] = message.useMessage();
  const [order, setOrder] = useState([{ key: '', number: '', Price: 0, name: '', state: '' }]);

  const onDelete = (index: any) => {
    const newOrder = order.filter((item, orderIndex) => index !== orderIndex);
    order.map(async (item, orderIndex) => {
      if (index === orderIndex) {
        try {
          await DeleteOrder(item.key);
          messageApi.open({
            type: 'success',
            content: '删除成功',
          });
        } catch (err) {
          console.log(err);
          messageApi.open({
            type: 'error',
            content: '删除失败',
          });
        }
      }
    });
    setOrder(newOrder);
  };

  /* const orderFn = (item: any) => {
    const { number, state, totalPrice, childernCus, _id } = item;
    return (item = {
      key: _id,
      number: number || '',
      Price: totalPrice || 0,
      name: childernCus[0].name,
      state: state,
      // tags: ['修改', '删除'],
    });
  }; */

  // 更新订单 ajax长轮询
  const onUpdate = () => {
    upDateOrder(order.reverse())
      .then(data => {
        const orderData = data.data.map((item: any) => {
          const { number, state, totalPrice, childernCus, _id } = item;
          return (item = {
            key: _id,
            number: number || '',
            Price: totalPrice || 0,
            name: childernCus[0].name,
            state: state,
            // tags: ['修改', '删除'],
          });
        });
        setOrder(orderData.reverse());
      })
      .catch(() => {
        // onUpdate();
      });
  };

  useEffect(() => {
    console.log('1');
    getOrder().then(data => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const orderData = data.data.map((item: any) => {
        const { number, state, totalPrice, childernCus, _id } = item;
        return (item = {
          key: _id,
          number: number || '',
          Price: totalPrice || 0,
          name: childernCus[0].name,
          state: state,
          // tags: ['修改', '删除'],
        });
      });
      setOrder(orderData.reverse());
      // onUpdate();
    });
  }, []);

  interface DataType {
    number: string;
    Price: number;
    name: string;
    state: string;
    // tags: string[];
  }

  const columns: ColumnsType<DataType> = [
    {
      title: '订单编号',
      dataIndex: 'number',
      key: 'number',
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      render: text => <a>{text}</a>,
    },
    {
      title: '总金额',
      dataIndex: 'Price',
      key: 'Price',
    },
    {
      title: '买家',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '交易状态',
      key: 'state',
      dataIndex: 'state',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record, index) => (
        <Space size="middle">
          <a>修改</a>
          <a onClick={record => onDelete(index)}>删除</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <Table columns={columns} dataSource={order} />
    </>
  );
}

export default OrderDet;
