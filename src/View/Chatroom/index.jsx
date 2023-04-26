import { useEffect, useRef, useState } from "react"
import { Input, Form } from 'antd'
import { useSelector, useDispatch } from "react-redux"
import { firstConnect } from "../../Hooks/useSocket";
import { getMessageAsync } from "../../store/features/message";
import io from "socket.io-client";
import "./index.css"
import PopoverChat from "../../Hooks/chatProp";
const socket = io("http://127.0.0.1:3006")
const { TextArea } = Input;
const Chatroom = (props) => {
  let [content, changeCon] = useState()
  let [list, changeList] = useState([])
  const listRef = useRef([])
  let { message } = useSelector((state) => state.msg)
  const dispatch = useDispatch()
  const userInfo = useSelector((store) => store.user.userInfo)
  const form = Form.useForm()[0]
  useEffect(() => {
    firstConnect()
  })

  // 获取message
  useEffect(() => {
    (async ()=>{
      if (!message) {
       try {
        await dispatch(getMessageAsync())
       } catch (error) {
        console.log("");
       }
      }
    })()

  }, [])
  useEffect(()=>{
    if(!message)message=[]
    changeList(message)
  },[message])
  const changeContent = (e) => {
    changeCon(content = e.target.value)
  }
  useEffect(() => {
    listRef.current = list
  }, [list])
  let arr= [...list]
  useEffect(() => {
    socket.on("sending", (data) => {
      const arr = [...listRef.current]
      arr.push(data)
      changeList(arr)
      var element = document.getElementById("show-chat");
      setTimeout(() => {
        element.scrollTop = element.scrollHeight + 2300;
      })
    })
  }, [socket])
  useEffect(() => {
    var element = document.getElementById("show-chat");
    element.scrollTop = element.scrollHeight + 2300;
  }, [list])

  const sendMsg = (e) => {
    const data = {
      nickname: userInfo.nickname,
      createTime: new Date(),
      username: userInfo.username,
      content: content,
      toUser: "room1",
      avator: userInfo.avator
    }
    form.resetFields()
    socket.emit("message", data)
  }
  return (
    <div>
      <div style={{ height: "380px" }} className="show-chat" id="show-chat">
        {list.map((item) => (
          <PopoverChat item={item}></PopoverChat>
        ))}
      </div>
      <div className="toolbar">123</div>
      <div className="inputRight" style={{ display: "flex" }}>
        <Form form={form}>
          <Form.Item name="content">
            <TextArea
              onChange={(e) => { changeContent(e) }}
              placeholder="Controlled autosize"
              onPressEnter={(e) => sendMsg(e)}
              style={{ width: "100%" }}
              autoSize={{ minRows: 4, maxRows: 15 }}
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
export default Chatroom