import React, { useEffect, useRef, useState } from 'react';
import { Badge, Divider, List, Skeleton } from 'antd';
import { Input } from 'antd';
import "./index.css"
import { useSelector, useDispatch } from 'react-redux'
import { getList, getNotRead, getUserInfo, removeHis } from '../../api/user';
import io from "socket.io-client";
import InfiniteScroll from 'react-infinite-scroll-component';
const { Search } = Input;
const socket = io("http://127.0.0.1:3006")
const ChatBar = (props) => {

  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const userInfo = useSelector((store) => store.user.userInfo)
  const isChat = useSelector((store) => store.msg.message)
  const dispatch = useDispatch()
  const [offset, increaseOff] = useState(0)
  const [active, changeAct] = useState("457192ba-d945-4ca9-aea6-5a7b37155aac")
  const loadMoreData = async () => {
    let timer
    clearInterval(timer)
    increaseOff(offset + 1)
    const getMore = async () => {
      const res = await getList(offset + 1, 10)
      if (res.data.length !== 0) {
        setList([...list, ...res.data])
      }
    }
    timer = setTimeout(() => {
      getMore()
    }, 1000)
  };
  let arrf
  useEffect(() => {

    if (loading) {
      return;
    }
    let arra
    setLoading(true);
    const getThat = async () => {
      try {
        const res = await getList(offset, 10)
        arra = await getUserInfo()
        arrf = await getNotRead(arra.data.username)
        res.data.map((item) => {
          arrf.data.forEach((element) => {
            if (item.username === element.from) {
              item.count = element.count
            }
          });
          return item
        })
        setList(res.data)
        socket.emit("other", {
          id: socket.id,
          username: arra.data.username
        })
      } catch (error) {
      }
    }
    getThat()
  }, [])
  const [count, setCount] = useState({
    username: "",
    count: 0
  })
  const [scount, setsCount] = useState({
    username: "",
    count: 0
  })
  const [Fl, setFl] = useState(true)
  const changeChannel = async (item) => {
    changeAct(item.id)
    if (localStorage.getItem("to") === item.username) {
      setFl(false)
    } else {
      setFl(true)
    }
    // 将count消除
    item.count = 0
    count.count = 0
    // 清除数据库
    const arra = await getUserInfo()
    await removeHis({ from: item.username, username: arra.data.username })
    localStorage.setItem("to", item.username)
    localStorage.setItem("nickname", item.nickname)
    let data
    if (item.id === "public") {
      data = {
        roomid: `public`,
      }
    } else {
      data = {
        roomid: `${item.id}${userInfo.id}`,
      }
    }
    // // 点击后先获取data的值
    // let response
    // if (isChat.findIndex((item) => item.roomid === data.roomid) === -1) {
    //   response = await dispatch(getRoomChat(data) as any)
    // }
    // // 在状态管理库里面添加新数据便于下次引用
    // const showMsg = isChat.filter((item) => item.roomid === data.roomid)
    // setShow(showMsg)
    // // 与服务器建长连接
    // props.getMsgs(response.payload.data)
  }
  useEffect(() => {
    socket.on("add", (data) => {
      setCount(data)
    })
    socket.on("notRead", (item) => {
      setsCount(item)
    })
  }, [socket])

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
                      <Badge count={item.username === "room1" ? scount.count : (item.username === count.username ? count.count : item.count)}>
                        {/* <Avatar src={"http://localhost:3006/files/" + item.avator} shape="square" size={45} /> */}
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