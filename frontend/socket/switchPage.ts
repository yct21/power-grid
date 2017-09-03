import { Observable } from "rxjs/Observable";
import { getSocket } from "socket";
import { InitialParams as LandingPageInitialParameters } from "LandingPage/store";

export function switchPage$(): Observable<LandingPageInitialParameters> {
  const socket = getSocket();
  return Observable.fromEvent(socket, "switchPage");
}
