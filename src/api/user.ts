/*
 ** 用户相关接口
 */

import request from '../utils/request';

export const LoginInterface = (value: Object): any => {
  return request('/users/login', 'post', value);
};

export const RegisterInterface = (value: Object): any => {
  return request('/users/reguser', 'post', value);
};
