/*
 ** 商品相关接口
 */

import request from '../utils/request';

export const findComm = () => {
  return request('/comm/findComm', 'get', {});
};

export const addComm = (commData: Object) => {
  return request('/comm/addComm', 'post', commData);
};

export const deleteComm = (id: any) => {
  return request('/comm/DeleteComm', 'post', { id });
};
