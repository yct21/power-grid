import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/merge";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/do";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { DOMSource } from "@cycle/dom/rxjs-typings";
import { StartupTempStore, createStartupTempStore } from "store/startupTempStore";
import { LandingPageStore, createLandingPageStore } from "store/landingPageStore";
import { GamePageStore, createGamePageStore } from "store/gamePageStore";
import { getSocket } from "socket";
import { SwitchStoreEvents, intent } from "store/intent";

export type Store = StartupTempStore | LandingPageStore | GamePageStore;



/*
     +--------------------+
     |  StartupTempStore  |
     +--------------------+
                |
                | Connect socket
                v
     +--------------------+
     |  LandingPageStore  |
     +------+-------------+
            |        ^
Enter game  |        |  Exit game
            v        |
     +--------------------+
     |   GamePageStore    |
     +--------------------+
  */

function legalSwitchStore(store$: BehaviorSubject<Store>) {
  return (switchStoreEvent: SwitchStoreEvents) => {
    const store = store$.getValue();

    if (switchStoreEvent.event === "connect_socket") {
      return store.storeName === "StartupTempStore";
    } else if (switchStoreEvent.event === "enter_game") {
      return store.storeName === "LandingPageStore";
    } else if (switchStoreEvent.event === "exit_game") {
      return store.storeName === "GamePageStore";
    }

    return false;
  }
}

export function createStore(domSource: DOMSource): BehaviorSubject<Store> {
  // This is the internal subscription of store
  const store$: BehaviorSubject<Store> = createStartupTempStore();

  const socket = getSocket();

  const {
    connectSocket$,
    enterGame$,
    exitGame$,
  } = intent(domSource, socket);

  const switchStore$ = connectSocket$
    .merge(connectSocket$)
    .merge(enterGame$)
    .merge(exitGame$)
    .filter(legalSwitchStore(store$));

  switchStore$.switchMap((switchStoreEvent: SwitchStoreEvents): Observable<Store> => {
    if (switchStoreEvent.event === "connect_socket") {
      return createLandingPageStore(domSource, socket);
    } else if (switchStoreEvent.event === "enter_game") {
      return createGamePageStore(domSource, socket);
    } else if (switchStoreEvent.event === "exit_game") {
      return createLandingPageStore(domSource, socket);
    }

    throw new Error("Error in SwitchStoreEvent");
  }).subscribe(store$);

  return store$;
}
