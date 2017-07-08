import { DOMSource } from "@cycle/dom/rxjs-typings";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";

export interface LandingPageStore {
  storeName: "LandingPageStore",
}

export function createLandingPageStore(domSource: DOMSource, socket: SocketIOClient.Socket) {
  const store: LandingPageStore = { storeName: "LandingPageStore" };

  return Observable.of(store);
}
