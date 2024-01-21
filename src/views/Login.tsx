import { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { Link } from 'react-router-dom';
// import { LoginInterface } from '../api/user';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogin } from '../store/counter/usrSlice';
import { unwrapResult } from '@reduxjs/toolkit';
// import { setUser } from '../store/counter/usrSlice';

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

export default function Login() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = (values: string) => {
    dispatch(userLogin(values))
      .then(unwrapResult)
      .then((data: any) => {
        navigate('/admin');
      })
      .catch((err: any) => {
        console.log(err);
        messageApi.open({
          type: 'error',
          content: '登录失败',
        });
      });
  };
  /* const onLogin: any = async (account: string, password: string) => {
    try {
      // const result = await LoginInterface(account, password);
      // dispatch(setUser(result.data));
    } catch (err: any) {
      // console.log(err);
      // console.log('cuowu');
    }
  }; */
  // 定义用户名
  // const [account, setAccount] = useState('admin5');
  // 定义密码
  // const [password, setPassword] = useState('1234567859Z_');
  return (
    <div className="userBox">
      {contextHolder}
      <h1 className="title">登录</h1>
      <Form name="basic" style={{ maxWidth: 600 }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
        <Form.Item name="account" rules={[{ required: true, message: '用户名不能为空' }]}>
          <Input placeholder="账号" defaultValue="admin5" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: '密码不能为空' }]}>
          <Input.Password placeholder="密码" defaultValue="1234567859Z_" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" block htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
      <Link to="/register">注册</Link>
    </div>
  );
}
