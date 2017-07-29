import { Observable } from "rxjs/Observable";
import { getSocket } from "socket";
import { StoreInitialParameters as LandingPageInitialParameters } from "LandingPage/store";

export function switchPage$(): Observable<LandingPageInitialParameters> {
  const socket = getSocket();
  return Observable.fromEvent(socket, "switchPage");
}
