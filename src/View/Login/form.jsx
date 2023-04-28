import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Typography, Button, Checkbox, Form, Input } from 'antd';

// import { login } from "../../api/user"
import { useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { loginAsync } from '../../store/features/userSlice';
const { Title } = Typography;
const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [value, changeValue] = useState({
    username: "",
    password: ""
  })
  const onFinish = (values) => {
  }
  const [userInfo, changeInfo] = useState({
    username: "",
    password: ""
  })
  const login = async () => {
    try {
      const res = await dispatch(loginAsync(userInfo))
      console.log(res.error);
      if (res.error) {
      } else {
        navigate("/chatroom")
      }
    } catch (error) {
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


  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Title style={{ textAlign: 'center', marginBottom: '20px', color: "rgb(22, 119, 255)" }} level={2}>Bobi的聊天室</Title>
      <Form.Item
        name="username"
        rules={[{ required: true, message: '请输入用户名' }]}

      >
        <Input value={userInfo.username} onChange={(e) => { changeName(e) }} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码！' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="密码"
          onChange={(e) => { changepsw(e) }}
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>记住密码</Checkbox>
        </Form.Item>
        <a className="login-form-forgot" href="">
          忘记密码？
        </a>
      </Form.Item>
      <Form.Item className='login-btn'>
        <Button onClick={() => { login() }} type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button>
        <div className='regist'>还没有账号？<a href="" onClick={()=>navigate("/regist")}>注册一个</a></div>
      </Form.Item>
    </Form>
  )
}

export default App