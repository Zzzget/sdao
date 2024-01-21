// 1.创建一个新的axios实例
import axios from 'axios';

export const baseURL = 'http://127.0.0.1:3001';
const instance = axios.create({
  baseURL,
  timeout: 5000,
});

// 2.请求拦截器，如果有token进行头部携带
instance.interceptors.request.use(
  config => {
    const json = localStorage.getItem('persist:root');
    let user = JSON.parse(json as string);
    let users = JSON.parse(user.user as string);
    if (users.token) {
      config.headers.Authorization = `Bearer ${users.token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// 3.响应拦截器： 1. 剥离无效数据 2.处理token失效
instance.interceptors.response.use(
  // 取出data
  res => res.data,
  err => {
    if (err.response && err.response.status === 401) {
      // 清空无效用户信息
      // store.commit('user/setUser', {});
      // 跳转到登录页
      // 拿到当前路由地址并转码
      // const fullPath = encodeURIComponent(router.currentRoute.value.fullPath);
      // router.push('/login?redirectUrl=' + fullPath);
    }
    return Promise.reject(err);
  }
);
// 4.导出一个函数，调用当前的axios实例发请求
// eslint-disable-next-line import/no-anonymous-default-export
export default (url: string, method: string, submitData: any) => {
  return instance({
    url,
    method,
    // 判断请求方法，提交相应的参数
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData,
  });
};
