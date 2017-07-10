import { DOMSource } from "@cycle/dom/rxjs-typings";
import { Observable } from "rxjs/Observable";
import "rxjs/observable/of";

export type SwitchStoreEvents =
  { event: "connect_socket" } |
  { event: "enter_game", gameId: string } |
  { event: "exit_game" };

export function intent(domSource: DOMSource, socket: SocketIOClient.Socket) {
  // const connectSocket$ = Observable.create((observer: Observer<SwitchStoreEvents>) => {
  //   socket.on("connected", () => {
  //     observer.next( {event: "connect_socket" });

  //     // Close this listener after the first time this stream emit value,
  //     // and complete this observable
  //     socket.off("connected");
  //     observer.complete();
  //   })
  // })

  // const enterGame$ = domSource.select()
  const enterGameEvent: SwitchStoreEvents = {event: "enter_game", gameId: "111"};
  const connectSocket$: Observable<SwitchStoreEvents> = Observable.of({event: "connect_socket"});
  const enterGame$: Observable<SwitchStoreEvents> = Observable.of(enterGameEvent);
  const exitGame$: Observable<SwitchStoreEvents> = Observable.of({event: "exit_game"});

  return {
    connectSocket$,
    enterGame$,
    exitGame$,
  }
}
