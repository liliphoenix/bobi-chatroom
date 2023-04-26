import { useSelector } from "react-redux";
import io from "socket.io-client";
const socket = io("http://127.0.0.1:3006")

export function firstConnect() {
  socket.on("connect", () => {
    console.log(socket.id)
  });
  socket.emit("hello", {
    id: socket.id,
  })
}
export const sendMsg = () => {

}