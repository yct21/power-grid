import * as td from "testdouble";
import { assert } from "chai";
import { TestScheduler } from "rxjs/testing/TestScheduler";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Store } from "./types";

// Some helper functions

function mockCreateStore(domSource: string, socket: string, scheduler: TestScheduler): void {
  // mock landingPageStore
  const fakeCreateLandingPageStore = (domSource: string, socket: string) => {
    return scheduler.createColdObservable("xxxxxxxxxxxxxxxxxx", {
      x: {
        storeName: "LandingPageStore",
      }
    });
  }
  td.replace("store/landingPageStore", { createLandingPageStore: fakeCreateLandingPageStore });

  // mock gamePageStore
  const fakeCreateGamePageStore = (domSource: string, socket: string) => {
    return scheduler.createColdObservable("xxxxxxxxxxxxxxxxxx", {
      x: {
        storeName: "GamePageStore",
      }
    });
  }
  td.replace("store/gamePageStore", { createGamePageStore: fakeCreateGamePageStore });
}

function mockSocket() {
  const fakeSocket = "fakeSocket";
  const fakeGetSocket = td.function("fakeGetSocket");
  td.when(fakeGetSocket()).thenReturn(fakeSocket);
  td.replace("socket", { getSocket: fakeGetSocket });

  return fakeSocket;
}

type EventMarbles = {
  connectSocketMarble: string,
  enterGameMarble: string,
  exitGameMarble: string,
}

function mockIntent(
  scheduler: TestScheduler,
  eventMarbles: EventMarbles,
) {
  const { connectSocketMarble, enterGameMarble, exitGameMarble } = eventMarbles;
  const connectSocket$ = scheduler.createColdObservable(
    connectSocketMarble,
    { x: { event: "connect_socket" }},
  );

  const enterGame$ = scheduler.createColdObservable(
    enterGameMarble,
    { x: { event: "enter_game" } },
  );

  const exitGame$ = scheduler.createColdObservable(
    exitGameMarble,
    { x: { event: "exit_game" } },
  )

  const fakeIntent = td.function("fakeIntent");
  td.when(fakeIntent("fakeDomSource", "fakeSocket")).thenReturn({
    connectSocket$,
    enterGame$,
    exitGame$
  });

  td.replace("store/intent", { intent: fakeIntent });
}

function expectStore(scheduler: TestScheduler, store$: BehaviorSubject<Store>, marble: string) {
  scheduler.expectObservable(store$).toBe(marble, {
    l: { storeName: "StartupTempStore" },
    m: { storeName: "LandingPageStore" },
    n: { storeName: "GamePageStore" },
  });
}

describe("frontend/stores", () => {
  describe("Feature: create store stream as the model of application", () => {
    it("Scenario: store switches normally", () => {
      // Given a DOMSource as parameter
      const fakeDomSource = "fakeDomSource";

      // And a function to get socket object
      const socket = mockSocket();

      // And store initializers
      const scheduler = new TestScheduler(assert.deepEqual);
      mockCreateStore(fakeDomSource, socket, scheduler);

      // And we have streams for switching store
      mockIntent(scheduler, {
        connectSocketMarble: "--x----------",
        enterGameMarble:     "------x------",
        exitGameMarble:      "----------x--",
      })
      const expected =       "l-mmmmnnnnmmmmmmmmmmmmmmmmmm"; // frame 2 won't emit since it's still a BehaviorSubject

      // When createStore is called
      const { createStore } = require("./index");
      const store$ = createStore(fakeDomSource);

      // Then it returns a StartupTempStore
      expectStore(scheduler, store$, expected)
      scheduler.flush();
    });
  })
});
