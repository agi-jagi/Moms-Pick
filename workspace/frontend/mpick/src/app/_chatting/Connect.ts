const Connect = (socket: any) => {
  if (localStorage.getItem("accessToken")) {
    const jwt = localStorage.getItem("accessToken");
    socket = new WebSocket("ws://localhost:5000/ws?jwt=" + jwt);
    socket.onopen = (e: any) => {
      console.log("connected", e);
    };
    socket.onmessage = (e: any) => {
      console.log("message", e.data.message);
    };
    return socket;
  }
};

export default Connect;
