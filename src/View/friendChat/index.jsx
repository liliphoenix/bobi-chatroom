import { useEffect, useRef, useState } from "react"
import { Input, } from 'antd'
import { useSelector, } from "react-redux"
const { TextArea } = Input;
import io from "socket.io-client";
import { getHistory } from "../../api/user"
const socket = io("http://127.0.0.1:3006")
import "./index.css"
import PopoverChat from "../../Hooks/chatProp"
import eventBus from "../../utils/eventBus"
const userInfo = useSelector((store) => store.user.userInfo)
const FriendChat = (props) => {
  // 定义数据源
  const [list, changeList] = useState([])
  const listRef = useRef([])
  // 获取到历史数据 并渲染
  const getHis = async () => {
    const res = await getHistory({
      username: userInfo.username,
      toUser: localStorage.getItem("to")
    })
    changeList(res.data)
  }
  useEffect(() => {
    getHis()
    socket.emit("hello", {
      id: socket.id,
      username: userInfo.username
    })
  }, [])
  let [content, changeCon] = useState()
  const changeContent = (e) => {
    changeCon(content = e.target.value)
  }
  // 实现及时通讯
  // 发送消息
  const sendMsg = (e) => {
    e.target.value = ""
    const data = {
      roomid: props.dating[0].roomid,
      content,
      nickname: userInfo.nickname,
      username: userInfo.username,
      toUser: localStorage.getItem("to"),
      avator: userInfo.avator,
      createTime: new Date()
    }
    const arr = [...list, data]
    changeList(arr)
    socket.emit("friendChat", data)
    var element = document.getElementById("show-chat");
    setTimeout(() => {
      element.scrollTop = element.scrollHeight + 2300;
    })
  }
  // 接收消息
  useEffect(() => {
    listRef.current = list
  }, [list])
  useEffect(() => {
    socket.on("getMee", (data) => {
      console.log(data);
      const arr = [...listRef.current]
      arr.push(data)
      changeList(arr)
    })
    socket.on("addone", (data) => {
      eventBus.emit('myParams', data)
    })
  }, [socket])
  //监听用户窗口
  useEffect(() => {
    socket.emit("getUser", { username: userInfo.username, toUser: localStorage.getItem("to") })
    getHis()
  }, [localStorage.getItem("to")])
  return (
    <div>
      <div style={{ height: "380px" }} className="show-chat" id="show-chat">
        {list.map((item, index) => (
          <PopoverChat key={index} item={item}></PopoverChat>
        ))}
      </div>
      <div className="toolbar" >

      </div>
      <div style={{ display: "flex", }}>

        <TextArea
          onChange={(e) => { changeContent(e) }}
          onPressEnter={(e) => sendMsg(e)}
          placeholder="Controlled autosize"
          autoSize={{ minRows: 5, maxRows: 5 }}
        />
      </div>

    </div>
  )
}
export default FriendChat