import { useEffect, useState } from "react"
import { Input, Form,Spin } from 'antd'
import { useSelector, useDispatch } from "react-redux"
import { addMessage, getRoomMsgAsync } from "../../store/features/message";
import "./index.less"
import PopoverChat from "../../Hooks/chatProp";
// const socket = io("http://127.0.0.1:3006")
import socket from "../../Hooks/useSocket";
const { TextArea } = Input;
const Chatroom = (props) => {
  let [content, changeCon] = useState()
  let [list, changeList] = useState([])
  let {userInfo} = useSelector((store) => store.user)
  let { message,toUser } = useSelector((state) => state.msg)  
  let [loading,setLoading]=useState(false)
  const dispatch = useDispatch()
  const form = Form.useForm()[0]
  // 获取message
  useEffect(() => {
    (async ()=>{
      if (!message) {
       try {
        setLoading(true)
        await dispatch(getRoomMsgAsync({
          username:userInfo.username,
          toUser:toUser.username
        }))
       } catch (error) {
       }
      }
    })()
  }, [userInfo])
  useEffect(()=>{
    if(!message)message=[]
    if(message.length>0){
      setLoading(false)
    }
    changeList(message)

  },[message])

  // 对话频道切换时
  useEffect(()=>{
    (async ()=>{
       try {
        await dispatch(getRoomMsgAsync({
          username:userInfo.username,
          toUser:toUser.username
        }))
       } catch (error) {
       }
    })()
  },[toUser])
  const changeContent = (e) => {
    changeCon(content = e.target.value)
  }
  useEffect(() => {
    socket.on("sending", (data) => {
      console.log(data);
      console.log(sessionStorage.getItem("username"));
      if(data.toUser===sessionStorage.getItem("toUser")){
        dispatch(addMessage(data))
        var element = document.getElementById("show-chat");
        setTimeout(() => {
          element.scrollTop = element.scrollHeight + 2300;
        })
      }else if(sessionStorage.getItem("toUser")===data.username&&data.toUser===sessionStorage.getItem("username")){
        dispatch(addMessage(data))
        var element = document.getElementById("show-chat");
        setTimeout(() => {
          element.scrollTop = element.scrollHeight + 2300;
        })
      }
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
      toUser: toUser.username,
      avator: userInfo.avator
    }
    form.resetFields()   
    socket.emit("message", data)
  }
  return (
    <div>
      <Spin spinning={loading}>
      <div style={{ height: "380px" }} className="show-chat" id="show-chat">
        {list.map((item,index) => (
          <div key={index}>
            <PopoverChat  item={item}></PopoverChat>
          </div>
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
      </Spin>
    </div>
  )
}
export default Chatroom