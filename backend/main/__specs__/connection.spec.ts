import * as td from "testdouble";
import * as Rx from "rxjs/Rx";
import { assert } from "chai";

describe("main/connection", () => {
  it("Feature: server reacts when user connected", () => {
    const scheduler = new Rx.TestScheduler(assert.deepEqual);

    // Given we have a store and server object as arguments
    const store = "store";
    const server = "server";

    // And a stream of client's connection
    const connections = scheduler.createColdObservable("--x---y--", {
      x: "connection",
      y: "connection2",
    });
    const userConnected$ = td.function();
    td.when(userConnected$(server)).thenReturn(connections);

    // And a stream of client's initializeUser requests
    const userReuqest1 = { userId: "userId1", namespace: "namespace1" };
    const userRequest2 = { userId: "userId2", namespace: "namespace2" };
    const initialUserRequest1$ = scheduler.createColdObservable("--x------", {
      x: userReuqest1,
    });
    const initialUserRequest2$ = scheduler.createColdObservable("---x-----", {
      x: userRequest2,
    });
    const onInitialUser = td.function();
    td.when(onInitialUser("fakeServer1")).thenReturn(initialUserRequest1$);
    td.when(onInitialUser("fakeServer2")).thenReturn(initialUserRequest2$);

    // And a stream of sending page params to client
    const pageParameter1 = "page params1";
    const pageParameter2 = "page params2";
    const sendPageParams = td.function();
    td.when(sendPageParams(userReuqest1)).thenReturn();
    td.when(sendPageParams(userReuqest1));

  })
});
