import { DOMSource } from "@cycle/dom/rxjs-typings";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import "rxjs/add/observable/of";
import "rxjs/add/observable/never";
import { onConnect } from "socket";

// We call this file `intent` since it's a convention in cycle.js.
// Although we did not follow cycle.js's driver convention strictly.

export type SwitchStoreEvents =
  { event: "connect_socket" } |
  { event: "enter_game", gameId: string } |
  { event: "exit_game" };

export function intent(domSource: DOMSource, socket: SocketIOClient.Socket) {
  const connectSocket$ = Observable.create((observer: Observer<SwitchStoreEvents>) => {
    onConnect(socket, () => {
      observer.next( {event: "connect_socket" });

      observer.complete();
    });
  })

  // const enterGame$ = domSource.select()
  const enterGameEvent: SwitchStoreEvents = {event: "enter_game", gameId: "111"};
  const enterGame$: Observable<SwitchStoreEvents> = Observable.of(enterGameEvent);
  const exitGame$: Observable<SwitchStoreEvents> = Observable.of({event: "exit_game"});

  return {
    connectSocket$,
    enterGame$,
    exitGame$,
  }
}
