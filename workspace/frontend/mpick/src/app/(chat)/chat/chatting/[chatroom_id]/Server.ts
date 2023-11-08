// import { io } from "socket.io-client";
// const socket = io({
//   path: "/ws",
// });
// export default socket;

const jwt = localStorage.getItem("accessToken")
const socket = new WebSocket("ws://localhost:3000/ws?jwt=" + jwt)
socket.onopen = e => {
  console.log("connected", e);
}
socket.onmessage = e => {
  console.log("message", e);
}
export default socket;