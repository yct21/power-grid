import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { DOMSource } from "@cycle/dom/rxjs-typings";
import { NetworkStatus } from "socket/networkStatus";
import { onlineNum } from "LandingPage/store/onlineNum";
import { networkStatus } from "LandingPage/store/networkStatus";
import { UserName, userName } from "LandingPage/store/userName";

// Parameter comes from a switchPage event from router
export interface InitialParams {
  onlineNum: number,
}

// Store properties
export interface Store {
  onlineNum$: BehaviorSubject<number>,
  networkStatus$: BehaviorSubject<NetworkStatus>,
  userName: UserName,
}

export function createStore(initialParams: InitialParams, DOMSource: DOMSource) {
  return {
    onlineNum$: onlineNum(initialParams.onlineNum),
    networkStatus$: networkStatus(),
    userName: userName(DOMSource),
  }
}
