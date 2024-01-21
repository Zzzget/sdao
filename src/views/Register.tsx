import { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { RegisterInterface } from '../api/user';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CounterState } from '../store/counter/usrSlice';
// import { setUser } from '../store/counter/usrSlice';

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

export default function Register() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const value = useSelector((state: CounterState) => state.user);
  console.log(value);
  const onFinish = async (values: any) => {
    try {
      await RegisterInterface(values);
      navigate('/');
      messageApi.open({
        type: 'success',
        content: '注册成功',
      });
    } catch (err) {
      messageApi.open({
        type: 'error',
        content: '登录失败',
      });
    }
  };
  return (
    <div className="userBox">
      {contextHolder}
      <h1 className="title">注册</h1>
      <Form name="basic" style={{ maxWidth: 600 }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
        <Form.Item name="name" rules={[{ required: true, message: '用户名不能为空' }]}>
          <Input placeholder="用户名" defaultValue="栋栋" />
        </Form.Item>

        <Form.Item name="account" rules={[{ required: true, message: '用户名不能为空' }]}>
          <Input placeholder="账号" defaultValue="admin5" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: '密码不能为空' }]}>
          <Input.Password placeholder="密码" defaultValue="1234567859Z_" />
        </Form.Item>
        <Form.Item name="password2" rules={[{ required: true, message: '确认密码不能为空' }]}>
          <Input.Password placeholder="确认密码" defaultValue="1234567859Z_" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" block htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
      <Link to="/">去登录</Link>
    </div>
  );
}
