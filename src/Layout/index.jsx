import "./index.css"
import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import ChatBar from "../View/ChatBar";
import Chatroom from "../View/Chatroom";
import ChatHead from "../View/ChatHead";
import { firstConnect } from "../Hooks/useSocket";
const { Header, Sider, Content } = Layout;
const headerStyle= {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: "white",
  borderBottom: "1px solid rgba(126, 126, 126,.4)",
  borderLeft: "1px solid rgba(126, 126, 126,.4)"
};

const contentStyle= {
  textAlign: 'center',
  height: "100px",
  color: '#fff',
  backgroundColor: 'rgb(255,255,255)',
  padding: "20px 0"
};

const siderStyle= {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  height: '100%',
  backgroundColor: 'white',
  minWidth: "300px",
  overflow: "hidden"
};



const Dayout = () => {
  const [msg, changeMsg] = useState()
  let [flag, changeFlag] = useState(true)
  const sendMsg = (msg) => {
    changeMsg(msg)
    if (localStorage.getItem("to") === "room1") {
      changeFlag(true)
    } else {
      changeFlag(false)
    }
  }
  // const isShow = () => {
  //   if (flag) {
  //     return <Chatroom data={msg}></Chatroom>
  //   } else {
  //     return <FriendChat dating={msg}></FriendChat>
  //   }
  // // }
  // useEffect(() => {
  //   isShow()
  // }, [flag])
  useEffect(() => {
    firstConnect()
  })
  return (
    <div className="chat-container" >
      <Layout style={{ height: '100%', }}>
        <Sider width="265" className="" style={siderStyle} >
          <ChatBar getMsgs={sendMsg} />
        </Sider>
        <Layout>
          <Header style={headerStyle}>
            <ChatHead></ChatHead>
          </Header>
          <Content style={contentStyle} >
            <Chatroom data={123}></Chatroom>
          </Content >
        </Layout>
      </Layout>
    </div>
  )
}
export default Dayout