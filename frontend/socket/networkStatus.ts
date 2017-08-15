import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/operator/mapTo";
import "rxjs/add/observable/merge";
import "rxjs/add/operator/distinct";
import { getSocket } from "socket";

export type NetworkStatus = "online" | "offline";

// Create this subject here for reuse
const socket = getSocket();
const status: NetworkStatus = socket.connected ? "online" : "offline";

const networkStatusSubject$ = new BehaviorSubject(status);

const onConnect$ = Observable.fromEvent(socket, "connect").mapTo("online");
const onDisconnect$ = Observable.fromEvent(socket, "disconnect").mapTo("offline");

Observable
  .merge(onConnect$, onDisconnect$)
  .distinct()
  .subscribe(networkStatusSubject$);

export function networkStatus$(): BehaviorSubject<NetworkStatus> {
  return networkStatusSubject$;
}
