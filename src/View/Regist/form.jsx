import React, { useState } from 'react';
import { LockOutlined, UserOutlined, PhoneOutlined, ContactsOutlined } from '@ant-design/icons';
import { Typography, Button, Form, Input } from 'antd';

// import { login } from "../../api/user"
import { useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom'
import Avator from './avator';
import { Regist, Checked } from '../../api/user';
const { Title } = Typography;
const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [value, changeValue] = useState({
    username: "",
    password: "",
    mobile: "",
    nickname: "",
    avator: ""
  })
  const onFinish = (values) => {
  };
  const onFinishFailed = (errorInfo) => {
  };
  const login = async () => {
    changeValue({
      ...value,
      avator: localStorage.getItem("url") ? "1" : "2"
    })
    try {
      const { data } = await Regist(value)
      if (data.error) {
      } else {
        navigate("/")
      }
    } catch (error) {
      console.log(error);
    }
  }
  const changepsw = (e) => {
    changeInfo(() => {
      return {
        ...userInfo,
        password: e.target.value
      }
    })

  }
  const changeName = (e) => {
    changeInfo(() => {
      return {
        ...userInfo,
        username: e.target.value
      }
    })
  }
  const [userInfo, changeInfo] = useState({
    username: "lwb",
    password: "123456"
  })
  const check = async () => {
    const res = await Checked(value.username)
  }
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}

      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Title style={{ textAlign: 'center', marginBottom: '20px', color: "rgb(22, 119, 255)" }} level={2}>进入新世界的大门</Title>
      <Form.Item
        name="username"
        rules={[{ required: true, message: '请输入用户名' }, { pattern: /^[a-zA-Z0-9_-]{4,16}$/, message: "请输入4到16位（字母，数字，下划线，减号）" }]}

      >
        <Input value={userInfo.username} onBlur={() => check()} onChange={(e) => { changeValue({ ...value, username: e.target.value }) }} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name="nickname"
        rules={[{ required: true, message: '请输入昵称' }]}
      >
        <Input
          prefix={<ContactsOutlined className="site-form-item-icon" />}
          type="text"
          placeholder="昵称"
          onChange={(e) => { changeValue({ ...value, nickname: e.target.value }) }}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码！' }, { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: "至少八个字符，至少一个字母和一个数字" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="密码"
          onChange={(e) => { changeValue({ ...value, password: e.target.value }) }}
        />
      </Form.Item>
      <Form.Item
        name="phone"
        rules={[{ required: true, message: '请输入电话号码！' }, { pattern: /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/, message: "请输入正确的手机号" }]}
      >
        <Input
          prefix={<PhoneOutlined className="site-form-item-icon" />}
          type="text"
          placeholder="手机号码"
          onChange={(e) => { changeValue({ ...value, mobile: e.target.value }) }}
        />
      </Form.Item>
      <Form.Item>
        <Avator username={value.username}></Avator>
      </Form.Item>

      <Form.Item className='login-btn'>
        <Button onClick={() => { login() }} type="primary" htmlType="submit" className="login-form-button">
          注册
        </Button>
      </Form.Item>
      <img src="http://localhost:3006/upload/1678929505501.png" alt="" />
    </Form >

  );
};

export default App;