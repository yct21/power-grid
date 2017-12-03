import { Socket as PhoenixSocket } from 'phoenix'

interface Socket {
  socket: PhoenixSocket,
}

export function initSocket (url: string): Socket {
  const socket = new PhoenixSocket(url)

  return {
    socket,
  }
}
