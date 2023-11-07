import { io } from "socket.io-client";
const socket = io({
  path: "/ws",
});
export default socket;
