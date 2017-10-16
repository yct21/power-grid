import * as Rx from "rxjs/Rx";
import * as express from "express";
import * as http from "http";
import * as socketIO from "socket.io";

type Server = SocketIO.Server;
type Socket = SocketIO.Socket;
type Observable<T> = Rx.Observable<T>;

export function createServer(): SocketIO.Server {
  const app = express();
  const server = http.createServer(app);
  server.listen(8002);
  const io = socketIO(server);

  app.use((req: any, res: any, next: any) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8001');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

  return io;
}

export function fromSocketEvent$(socket: Socket, event: string): Observable<object> {
  return Rx.Observable.fromEvent(socket, event);
}

export function fromServerEvent$(server: Server, event: string): Observable<Socket> {
  return Rx.Observable.fromEvent(server, event);
}

export function emit(socket: Socket, eventName: string, data: object) {
  socket.emit(eventName, data);
}
