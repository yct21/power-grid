import * as Rx from "rxjs/Rx";
import { createServer } from "utils/socketIO";

export interface Socket {
  io: SocketIO.Server,
}

export function createSocketServer$() {
  return Rx.Observable.of(createServer())
    .map((io) => ({io} as Socket))
}
