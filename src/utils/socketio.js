import { io } from "socket.io-client";
const socket = io("/api")
export const conected = () => {
  console.log(socket.id);

  socket.on("connect", () => {
    console.log("用户链接")
  })
}
socket.on("disconnect", () => {
  console.log("丢失连接");
});