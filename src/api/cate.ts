/*
 ** 商品分类相关接口
 */

import request from '../utils/request';

export const findCate = () => {
  return request('/category/getCategory', 'get', {});
};
