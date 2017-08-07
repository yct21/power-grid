import { TestScheduler } from "rxjs/Testing/TestScheduler";
import { assert } from "chai";
import * as td from "testdouble";
const random = require("lodash/random");

describe("LandingPage/store", () => {
  it("Feature: it could create store with proper parameter", () => {
    const scheduler = new TestScheduler(assert.deepEqual);

    // Given store has onlineNum as initial parameter
    const initialParams = {
      onlineNum: 1024,
    };

    // And a stream of refreshOnlineNum
    const onlineNum = random();
    const refreshOnlineNum$ = scheduler.createColdObservable("----x--x--", { x: onlineNum });
    td.replace("socket/refreshOnlineNum", { refreshOnlineNum$: () => refreshOnlineNum$ });

    // And a stream of networkStatus
    const networkStatus$ = scheduler.createColdObservable("----x---x----");
    td.replace("socket/networkStatus", { networkStatus$: () => networkStatus$ } );

    // And a stream of userName and event changeUserName
    const fakeUserName$ = "fakeUserName";
    const fakeChangeUserName$ = "fakeChangeUserName";
    td.replace("LandingPage/store/userName", {
      userName: () => ({
        userName$: fakeUserName$,
        changeUserName$: fakeChangeUserName$,
      }),
    });

    // When create store
    const store = require("../index").createStore(initialParams);

    // Then the store has a stream of onlineNum
    scheduler.expectObservable(store.props.onlineNum$).toBe("y---x--x--", { x: onlineNum, y: 1024 });

    // And the store has a stream of networkStatus
    scheduler.expectObservable(store.props.networkStatus$).toBe("----x---x----");

    // And the store has a stream of userName as property and a stream of
    // changeUserName as event
    assert.equal(store.props.userName$, fakeUserName$);
    assert.equal(store.events.changeUserName$, fakeChangeUserName$);

    scheduler.flush();
  });
});
