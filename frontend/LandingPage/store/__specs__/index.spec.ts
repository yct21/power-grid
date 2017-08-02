import { TestScheduler } from "rxjs/Testing/TestScheduler";
import { assert } from "chai";
import * as td from "testdouble";

describe("LandingPage/store", () => {
  describe("Feature: it could create store with proper parameter", () => {
    const scheduler = new TestScheduler(assert.deepEqual);

    // Given store has onlineNum as initial parameter
    const initialParams = {
      onlineNum: 1024,
    };

    // And a stream of refreshOnlineNum
    const refreshOnlineNum$ = scheduler.createColdObservable("----x--x--");
    td.replace("socket/refreshOnlineNum", { refreshOnlineNum$: () => refreshOnlineNum$ });

    // And a stream of networkStatus
    const networkStatus$ = scheduler.createColdObservable("----x---x----");
    td.replace("socket/networkStatus", { networkStatus$: () => networkStatus$ } );

    // When create store
    const store = require("../index").createStore(initialParams);

    // Then the store has a stream of onlineNum
    scheduler.expectObservable(store.onlineNum$).toBe("y---x--x--", { y: 1024 });

    // And the store has a stream of networkStatus
    scheduler.expectObservable(store.networkStatus$).toBe("----x---x----");
  });
});
