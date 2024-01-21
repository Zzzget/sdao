/*
 ** 订单相关接口
 */

import request from '../utils/request';

export const getOrder = () => {
  return request('/Order/getOrder', 'get', {});
};

export const DeleteOrder = (_id: Object) => {
  return request('/Order/deleteOrder', 'post', { _id });
};

export const upDateOrder = (oldOrder: Array<Object>) => {
  return request('/Order/upDateOrder', 'post', oldOrder);
};
