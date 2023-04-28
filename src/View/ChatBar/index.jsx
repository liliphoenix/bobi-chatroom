import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Badge, Divider, List, Skeleton,Avatar} from 'antd';
import { Input } from 'antd';
import "./index.css"
import { useSelector, useDispatch } from 'react-redux'
import {  getUserInfo, removeHis } from '../../api/user';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getUserListAsync } from '../../store/features/userSlice'
import { setToUser } from '../../store/features/message'
import socket from '../../Hooks/useSocket';  
const { Search } = Input;
const ChatBar = (props) => {
  const [list, setList] = useState([]);
  const [nread,setnread]=useState([])
  const [loading, setLoading] = useState(false);
  let {userInfo,userList} = useSelector((store) => store.user)
  let {notRead} =useSelector((store)=>store.msg)
  const dispatch = useDispatch()
  const [offset, increaseOff] = useState(0)
  const [active, changeAct] = useState("457192ba-d945-4ca9-aea6-5a7b37155aac")
  const loadMoreData = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    (async()=>{
      await dispatch(getUserListAsync(offset+1,10))
      setLoading(false)
    })()
  };

  useEffect(() => {
    (async()=>{
      await dispatch(getUserListAsync(offset,10))
    })()
  }, [])

  useMemo(()=>{
    if(!userList) userList=[]
    setList(userList)
  },[userList])

  useMemo(()=>{
    if(!notRead) notRead=[]
    console.log(notRead);
    setnread(notRead)
  },[notRead])

  // 对未读信息进行实时的相应


  // 切换频道
  const changeChannel = async (item) => {
    // 把toUser给仓库
    dispatch(setToUser(item))
    sessionStorage.setItem("toUser",item.username)
    // 切换频道
    changeAct(item.id)
    // 清除数据库 将count消除
    const arra = await getUserInfo()
    const newArr=nread.filter(i=>{
      return  i.toUser===item.username
    })
    setnread(newArr)
    await removeHis({ from: item.username, username: arra.data.username })
  }
  // 获取未读信息，将未读信息添加列表头像上
  return (
    <>
      <Search className='search-box' style={{
        marginBottom: "20px", marginTop: "10px", width: "250px", height: "50px"
        , left: "10px", top: "20px", zIndex: "2", backgroundColor: "white"
      }} placeholder="input search text" enterButton />
      <div
        className='chat-bar'
        id="scrollableDiv"
        style={{
          height: "100%",
          overflow: 'auto',
          padding: '0 16px',
          border: '1px solid rgba(140, 140, 140, 0.35)',
          display: "flex",
          flexDirection: "column",
        }}
      >
        <InfiniteScroll

          dataLength={list.length}
          next={loadMoreData}
          hasMore={list.length < 11}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>这是所有用户了🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            style={{}}
            dataSource={list}
            renderItem={(item) => (
              // 
              <List.Item style={{ backgroundColor: active == item.id.toString() ? "rgba(167, 163, 163, 0.3)" : "", borderLeft: (active === item.id.toString()) ? "6px solid rgb(80, 176, 236)" : "", paddingLeft: "10px", paddingRight: "10px" }} key={item.id} onClick={() => changeChannel(item)}>
                <List.Item.Meta
                  avatar={
                    (
                      <Badge >
                        <Avatar style={{
                          backgroundColor: 'rgb(22, 119, 255)',
                          color: 'white',
                          }} shape="square" size={45} >
                            {item.nickname}
                        </Avatar>
                      </Badge>
                    )
                  }
                  title={<a style={{ fontSize: "15.5px", display: "block", marginRight: "30px", marginTop: "10px" }} onClick={() => changeChannel(item)}>{item.nickname}</a>}
                />
                <div style={{ fontSize: "12px", color: "rgb(101, 173, 101)" }}>在线</div>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </>
  );
};

export default ChatBar;