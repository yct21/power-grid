import * as io from "socket.io-client";

const url = "http://localhost:8002";

export function getSocket() {
  const socket = io(url);

  return socket;
}

export function onConnect(socket: SocketIOClient.Socket, handler: () => void) {
  socket.on("connect", () => {
    handler();
  });
}
