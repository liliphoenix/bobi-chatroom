import { Avatar } from "antd"
import "./index.css"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
const PopoverChat = (item) => {
  const nowUser = useSelector((store) => store.user.userInfo)
  const [newTime, setTime] = useState("")
  const [flag, setFlag] = useState(true)
  useEffect(() => {
    //天数
  }, [])
  return (
    <>

      <div style={{ position: "relative", height: "70px" }}>
        {item.item.username === nowUser.username ? (<span className="time time-left">{flag === true ? newTime : ""}</span>) : (<span className="time">{flag === true ? newTime : ""}</span>)}

        {item.item.username === nowUser.username ? (

          <div className="receiver" style={{ position: "relative", right: "16px", }}>
            <div>
              <span className="name-right">{item.item.nickname}</span>
              {/* <Avatar size={43} src={"/api/files/" + item.item.avator} /> */}
            </div>
            <div style={{ position: "relative", right: "5px", top: "15px", }}>
              <div className="right_triangle"></div>
              <span>{item.item.content} </span>
            </div>
          </div>) : (<div className="sender" style={{ position: "relative", left: "10px", }}>
            <div>
              <span className="name">{item.item.nickname}</span>
              {/* <Avatar size={43} src={"/api/files/" + item.item.avator} /> */}
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
}
export default PopoverChat