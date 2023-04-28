import { Avatar, } from 'antd';
import { useEffect, useMemo, useRef, useState } from 'react';
import Draw from "../../Hooks/drawer"
import { useSelector, useDispatch } from "react-redux"
import "./index.less"
import { getNotReadAsync } from '../../store/features/message';
import { getUserInfoAsync } from '../../store/features/userSlice'
import { sendUser } from '../../Hooks/useSocket'
const ChatHead = () => {
  const dispatch = useDispatch()
  let {userInfo}=useSelector(store=>store.user)
  let {toUser}=useSelector(store=>store.msg)
  const [user,changeUserInfo]=useState({
    nickname:"游客"
  })
  const [title,changeTitle]=useState({
    nickname:"游客"
  })
  useEffect(() => {
    const getuser = async () => {
      await dispatch(getUserInfoAsync())
    }
    getuser()
  }, [])
  // 获取用户信息
  useMemo(async()=>{
    if(!userInfo) userInfo={}
    sessionStorage.setItem("username",userInfo.username)
    sendUser(userInfo.username)
    await dispatch(getNotReadAsync(userInfo.username))
    changeUserInfo(userInfo)
  },[userInfo])
  useMemo(()=>{
    if(!toUser) toUser={
      nickname:"公共房间"
    }
    changeTitle(toUser)
  },[toUser])
  return (
    <div className="chat-head" style={{ color: "black", backgroundColor: "white" }}>
      <div className='left' style={{ width: "100%" }}>
        <Avatar style={{
          backgroundColor: 'rgb(22, 119, 255)',
          color: 'white',
        }} shape="square" size={45} >
          {user.nickname}
        </Avatar>
        <h3>{user.nickname}，欢迎你</h3>
      </div>
      <h2>{title.nickname||"公共房间"}</h2>
      <Draw></Draw>
    </div>
  )
}
export default ChatHead