import * as td from "testdouble";
import { assert } from "chai";
import { TestScheduler } from "rxjs/testing/TestScheduler";

function mockCreateStartupTempStore() {
  const fakeCreateStartupTempStore = td.function("fakeCreateStartupTempStore");
  const fakeStore = "fakeStore";
  td.when(fakeCreateStartupTempStore()).thenReturn(fakeStore);
  td.replace("stores/startupTempStore", { createStartupTempStore: fakeCreateStartupTempStore });

  return fakeCreateStartupTempStore;
}

interface EventMarbles {
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
    { a: { eventName: "connect_socket" }},
  );

  const enterGameSocket$ = scheduler.createColdObservable(
    enterGameMarble,
    { b: { eventName: "enter_game" } },
  );

  const exitGameSocket$ = scheduler.createColdObservable(
    exitGameMarble,
    { c: { eventName: "exit_game" } },
  )

  const fakeIntent = td.function();
  td.when(fakeIntent("fakeDomSource", "fakeSocket")).thenReturn({
    connectSocket$,
    enterGameSocket$,
    exitGameSocket$
  });

  td.replace("stores/intent", { intent: fakeIntent });
}

function expectStore(scheduler: TestScheduler, store: Store, marble: string) {
  scheduler.expectObservable()
}

describe("frontend/stores", () => {
  describe("Feature: create store stream as the model of application", () => {
    it("Scenario: store switches normally", () => {
      // Given we can create a StartupTempStore
      mockCreateStartupTempStore();

      // And DOMSource is provided
      const fakeDomSource = "fakeDomSource";

      // And we have streams for switching store
      const scheduler = new TestScheduler(assert.deepEqual);
      mockIntent(scheduler, {
        connectSocketMarble: "-x^",
        enterGameMarble:     "--x-",
        exitGameMarble:      "---x--",
      })

      // When createStore is called
      const { createStore } = require("./index");
      const store$ = createStore(fakeDomSource);

      // Then it returns a StartupTempStore
      scheduler.expectObservable(store$).toBe("x-", {x: fakeStore});
      scheduler.flush();
    });
  })
});
