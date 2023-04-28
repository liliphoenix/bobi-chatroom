import { Avatar } from "antd"
import "./index.less"
import { useSelector } from "react-redux"
import { memo, useEffect, useState } from "react"
const PopoverChat = memo((item) => {
  console.log(item);
  let {userInfo} = useSelector((store) => store.user)
  const [user,changeUser]=useState({})

  useEffect(() => {
    changeUser(userInfo)
  }, [userInfo])
  return (
    <>
      <div style={{ position: "relative", height: "70px" }}>
        {item.item.username ===userInfo.username ? (
          <div className="receiver" style={{ position: "relative", right: "16px", }}>
            <div>
              <span className="name-right">{item.item.nickname}</span>
              <Avatar style={{
          backgroundColor: 'rgb(22, 119, 255)',
          color: 'white',
          fontSize:"14px"
        }} shape="square" size={40} >
          {item.item.nickname}
        </Avatar>
            </div>
            <div style={{ position: "relative", right: "5px", top: "15px", }}>
              <div className="right_triangle"></div>
              <span>{item.item.content} </span>
            </div>
          </div>) : (<div className="sender" style={{ position: "relative", left: "10px", }}>
            <div>
              <span className="name">{item.item.nickname}</span>
              <Avatar style={{
          backgroundColor: 'rgb(22, 119, 255)',
          color: 'white',
          fontSize:"14px"
        }} shape="square" size={40} >
          {item.item.nickname}
        </Avatar>
            </div>
            <div style={{ position: "relative", left: "5px", top: "15px" }}>
              <div className="left_triangle"></div>
              <span>{item.item.content} </span>
            </div>
          </div>
        )}
      </div >
    </>
  )
})
export default PopoverChat