import { DOMSource } from "@cycle/dom/rxjs-typings";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of"
import { GamePageStore } from "store/types";

export function createGamePageStore(domSource: DOMSource, socket: SocketIOClient.Socket) {
  const initialValue: GamePageStore = {
    storeName: "GamePageStore",
  }

  return Observable.of(initialValue);
}
