import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/operator/mapTo";
import "rxjs/add/observable/merge";
import "rxjs/add/operator/distinct";
import { getSocket } from "socket";

export type NetworkStatus = "online" | "offline";

export function networkStatus$(): Observable<NetworkStatus> {
  const socket = getSocket();

  const status: NetworkStatus = socket.connected ? "online" : "offline";
  const onConnect$ = Observable.fromEvent(socket, "connect").mapTo("online");
  const onDisconnect$ = Observable.fromEvent(socket, "disconnect").mapTo("offline");

  return Observable
    .merge(onConnect$, onDisconnect$)
    .startWith(status)
    .distinct();
}
