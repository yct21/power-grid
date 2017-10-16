import * as Rx from "rxjs/Rx";
import { createServer } from "utils/socketIO";

export interface Server {
  io: SocketIO.Server,
}

export function userConnection$(server: Server): Rx.Observable<string> {
  return Rx.Observable.of("meow");
}

export function createSocketServer$() {
  return Rx.Observable.of(createServer())
    .map((io) => ({io} as Server))
}
