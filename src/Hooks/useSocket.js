
import io from "socket.io-client"
const socket = io("http://127.0.0.1:3006")

export function firstConnect () {
  socket.on("connect", () => {

  })
}
export const sendUser = () => {
  socket.emit("other", {
    username: sessionStorage.getItem("username")
  })
}
export const sendMsg = (data) => {
  socket.emit("message", data)
}
export default socket