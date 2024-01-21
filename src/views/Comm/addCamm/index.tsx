import React, { useEffect, useState } from 'react';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Select, Upload, message } from 'antd';
import { useDispatch } from 'react-redux';
import { fendCate } from '../../../store/counter/commSlice';
import { addComm } from '../../../api/comm';
import { unwrapResult } from '@reduxjs/toolkit';
import './index.scss';

export default function AddComm() {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  interface cateinfe {
    _id: string;
    name: string;
  }
  const [cate, setCate] = useState<Array<cateinfe>>([]);
  const { RangePicker } = DatePicker;
  const { TextArea } = Input;
  useEffect(() => {
    dispatch(fendCate())
      .then(unwrapResult)
      .then((data: any) => {
        setCate(data);
      });
  }, []);

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  interface finface {
    cate: string;
    comment: string;
    name: string;
    picture: Array<Object> | string;
    price: number;
    rawMaterial: Array<Object>;
    spec: Array<Object>;
  }
  interface picface {
    thumbUrl: string;
  }
  const onFinish = async (values: finface) => {
    const commData = values.cate ? (values.picture as Array<Object>).map(item => (item = (item as picface).thumbUrl)) : [];
    values.picture = commData;
    console.log('Success', values);
    try {
      await addComm(values);
      messageApi.open({
        type: 'success',
        content: '添加成功',
      });
    } catch (err) {
      messageApi.open({
        type: 'error',
        content: '添加失败',
      });
    }
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };

  return (
    <div className="addComm">
      {contextHolder}
      <Form className="Form" onFinish={onFinish} labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="horizontal" style={{ maxWidth: 600 }}>
        <Form.Item label="名称" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="价格" name="price">
          <Input />
        </Form.Item>
        <Form.Item label="描述" name="comment">
          <Input />
        </Form.Item>
        <Form.Item label="原料">
          <Form.List name="rawMaterial">
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item {...formItemLayout} required={false} key={field.key} className="flo">
                    <Form.Item {...field} validateTrigger={['onChange', 'onBlur']} noStyle>
                      <Input style={{ width: '60%' }} />
                    </Form.Item>
                    {fields.length > 1 ? <MinusCircleOutlined className="dynamic-delete-button" onClick={() => remove(field.name)} /> : null}
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} style={{ width: '60%' }} icon={<PlusOutlined />}>
                    Add field
                  </Button>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add('The head item', 0);
                    }}
                    style={{ width: '60%', marginTop: '20px' }}
                    icon={<PlusOutlined />}
                  >
                    Add field at head
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>
        <Form.Item label="规格">
          <Form.List name="spec">
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item {...formItemLayout} required={false} key={field.key} className="flo">
                    <Form.Item {...field} validateTrigger={['onChange', 'onBlur']} noStyle>
                      <Input style={{ width: '60%' }} />
                    </Form.Item>
                    {fields.length > 1 ? <MinusCircleOutlined className="dynamic-delete-button" onClick={() => remove(field.name)} /> : null}
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} style={{ width: '60%' }} icon={<PlusOutlined />}>
                    Add field
                  </Button>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add('The head item', 0);
                    }}
                    style={{ width: '60%', marginTop: '20px' }}
                    icon={<PlusOutlined />}
                  >
                    Add field at head
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>
        <Form.Item label="分类" name="cate">
          <Select>
            {cate.map(item => (
              <Select.Option value={item.name} key={item._id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="图片" valuePropName="fileList" getValueFromEvent={normFile} name="picture">
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>图片</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item label="Button">
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
