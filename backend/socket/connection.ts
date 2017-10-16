import * as Rx from "rxjs/Rx";
import { User } from "store/user";
import { Server } from "socket";
import { fromSocketEvent$, fromServerEvent$ } from "utils/socketIO";

const defaultNameSpace = "LandingPage";

type Socket = SocketIO.Socket;
type Observable<T> = Rx.Observable<T>;

// Parameter from initialUser request from client
interface InitializeUserParams {
  userId: string,
  userName: string,
  nameSpace: string,
}

function socketConnected$(server: Server): Observable<Socket> {
  return fromServerEvent$(server.io, "connection");
}

function initializeUserRequestReceived$(socket: Socket) {
  return fromSocketEvent$(socket, "userConnected")
    .first()
    .map(({userId, userName, nameSpace}: InitializeUserParams) => {
      // Not null or ""
      if (userId && userName && nameSpace) {
        return {
          userId,
          userName,
          nameSpace,
          socketId: socket.id,
        };
      } else {
        throw(new Error("Invalid initializeUser parameter from client"));
      }
    });
}

export function userConnected$(server: Server): Observable<User> {
  // server <---connection---- client (we get socketId)
  return socketConnected$(server)
    // Then wait for an initializeUser event from client
    // server <---initialUser--- client (we get userId and userName from here)
    .mergeMap(initializeUserRequestReceived$)
}
