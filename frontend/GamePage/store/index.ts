import { DOMSource } from "@cycle/dom/rxjs-typings";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of"

export interface GamePageStore {
  storeName: "GamePageStore",
}

export function createGamePageStore(domSource: DOMSource, socket: SocketIOClient.Socket) {
  const initialValue: GamePageStore = {
    storeName: "GamePageStore",
  }

  return Observable.of(initialValue);
}
