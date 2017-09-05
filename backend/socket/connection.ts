import * as Rx from "rxjs/Rx";
import { RedisClient } from "redis";
import { User } from "user";
import { fromSocketEvent$, fromServerEvent$ } from "utils/socketIO";
import * as store from "utils/redis";

const defaultNameSpace = "LandingPage";

type Server = SocketIO.Server;
type Socket = SocketIO.Socket;
type Observable<T> = Rx.Observable<T>;

// Parameter from initialUser request from client
interface InitializeUserParams {
  userId: string,
  userName: string,
}

function socketConnected$(server: Server): Observable<Socket> {
  return fromServerEvent$(server, "connection");
}

function initializeUserRequestReceived$(socket: Socket) {
  return Rx
    .Observable
    .fromEvent(socket, "initializeUser")
    .first()
    .map(({userId, userName}: InitializeUserParams) => {
      // Not null or ""
      if (userId && userName) {
        return {
          userId,
          userName,
          socketId: socket.id,
        };
      } else {
        throw(new Error("Invalid initializeUser parameter from client"));
      }
    });
}

function nameSpaceFromStore$(
  redis: RedisClient,
  userId: string,
  userName: string,
  socketId: string,
): Observable<User> {
  return store.get$(redis, `user:${userId}:nameSpace`)
    .map((result: string | null) => {
      const nameSpace = result || defaultNameSpace;

      return {
        id: userId,
        name: userName,
        socketId,
        nameSpace
      };
    })
}

function storeUserInfo$(redis: RedisClient, user: User): Observable<User> {
  return Rx.Observable.zip(
    store.set$(redis, "user:${userId}:name", user.name),
    store.set$(redis, "user:${userId}:socketId", user.socketId),
    store.set$(redis, "user:${userId}:nameSpace", user.nameSpace),
  ).mapTo(user);
}

function userConnected(server: Server, redis: RedisClient): Observable<User> {
  // server <---connection---- client (we get socketId)
  return socketConnected$(server)
    // Then wait for an initializeUser event from client
    // server <---initialUser--- client (we get userId and userName from here)
    .mergeMap(initializeUserRequestReceived$)
    // Then get user nameSpace from redis
    .mergeMap(({userId, userName, socketId}) => nameSpaceFromStore$(
      redis,
      userId,
      userName,
      socketId,
    ))
    // Store it before return
    .mergeMap((user: User) => storeUserInfo$(redis, user))
}

export function manageUserConnections(server: SocketIO.Server, redis: RedisClient): void {
}
