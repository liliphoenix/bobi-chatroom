import React, { useEffect,useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row, Space } from 'antd';
import "./index.less"
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { changeUserInfoAsync } from '../../store/features/userSlice';
import { message} from 'antd';
const App = () => {
  const dispatch=useDispatch()
  const [open, setOpen] = useState(false);
  const user = useSelector((store) => store.user.userInfo)
  const [newUser, setUser] = useState({
    nickname: "",
    mobile: "",
  })
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    console.log(newUser)
    console.log(sessionStorage.getItem("username"));
    if (user.nickname == "" || user.mobile == "") {
      message.error("输入内容不能为空")
    } else {
      
      dispatch(changeUserInfoAsync({
        ...newUser,
        username:sessionStorage.getItem("username")
      }))
      setOpen(false);
    }
  };
  const getInfo = (e) => {
    setUser({
      ...newUser,
      mobile: e.target.value
    })
  }
  const getIn = (e) => {
    setUser({
      ...newUser,
      nickname: e.target.value
    })
  }
  return (
    <>
      <Button type="primary" style={{ position: "absolute", left: "490px", padding: "0 5px", width: "104px", height: "20px", fontSize: "10px", }} onClick={showDrawer} icon={<PlusOutlined />}>
        修改个人信息
      </Button>
      <Drawer
        title="修改个人信息"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={onClose}>取消</Button>
            <Button onClick={onClose} type="primary">
              确认修改
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="修改昵称"
                rules={[{ required: true, message: '请填写你的昵称' }]}
              >
                <Input name="name" onChange={(e) => { getIn(e) }} placeholder="请填写你的昵称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="url"
                label="修改手机号"
                rules={[{ required: true, message: '请填写你的手机号' }]}
              >
                <Input name="url" onChange={(e) => getInfo(e)} placeholder="请填写你的手机号" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="owner"
                label="Owner"
                rules={[{ required: true, message: 'Please select an owner' }]}
              >
                {/* <Avatar username={user.username}></Avatar> */}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default App;