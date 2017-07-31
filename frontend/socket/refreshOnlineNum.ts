import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/fromEvent";
import { getSocket } from "socket";

export function refreshOnlineNum$() {
  const socket = getSocket();
  return Observable.fromEvent<number>(socket, "refreshOnlineNum");
}
