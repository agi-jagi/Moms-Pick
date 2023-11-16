const Connect = (socket: any) => {
  if (localStorage.getItem("accessToken")) {
    const jwt = localStorage.getItem("accessToken");
    socket = new WebSocket("ws://localhost:5000/ws?jwt=" + jwt);
    socket.onopen = (e: any) => {
      console.log("connected");
    };
    socket.onmessage = (e: any) => {
      console.log("message");
    };
    return socket;
  }
};

export default Connect;
