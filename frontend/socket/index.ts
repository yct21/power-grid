import * as io from "socket.io-client";

export type NetworkStatus = "online" | "offline";

const url = "http://localhost:8002";

// Side effects

const socket = io(url, { autoConnect: false });
socket.connect();

// Export this socket
export function getSocket(): SocketIOClient.Socket {
  return socket;
}
