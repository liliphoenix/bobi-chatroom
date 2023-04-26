import { UserOutlined, AntDesignOutlined } from '@ant-design/icons';
import { Avatar, Tooltip } from 'antd';
import { useEffect, useRef, useState } from 'react';
import Draw from "../../Hooks/drawer"
import { useSelector, useDispatch } from "react-redux"
import "./index.css"
import { getInfo } from '../../store/features/userSlice';
import { getUserInfo } from '../../api/user';
const ChatHead = () => {
  const dispatch = useDispatch()
  const [name, changeName] = useState()
  const user = useSelector((store) => store.user.userInfo)
  const nameRef = useRef()
  useEffect(() => {
    const getuser = async () => {
      dispatch(getInfo())
      const res = await getUserInfo()
      console.log(res);
      changeName(res.data.nickname)
    }
    getuser()
  }, [])

  return (
    <div className="chat-head" style={{ color: "black", backgroundColor: "white" }}>
      <div className='left' style={{ width: "100%" }}>
        {/* <Avatar src={"/api/files/" + user.avator} shape='square' size={38} icon={<UserOutlined />} /> */}
        <h3>{name}，欢迎你</h3>
      </div>
      <Draw></Draw>
      <h2 style={{}}>{localStorage.getItem("nickname")}</h2>
      <div className='right' style={{ width: "100%" }}>
        <span className='online'>在线用户:</span>
        <Avatar.Group
          maxCount={2}
          maxPopoverTrigger="click"
          size={29}
          maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf', cursor: 'pointer' }}
        >
          {/* <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar> */}
          <Tooltip title="Ant User" placement="top">
            {/* <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} /> */}
          </Tooltip>
          <Avatar style={{ backgroundColor: '#1890ff' }} icon={<AntDesignOutlined />} />
        </Avatar.Group></div>
    </div>
  )
}
export default ChatHead