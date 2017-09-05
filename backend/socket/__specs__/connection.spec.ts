import * as td from "testdouble";
import { TestScheduler } from "rxjs/Testing/TestScheduler";
import { assert } from "chai";

describe("socket/connection", () => {
  it("Feature: user connections are correctly managed", () => {
    const scheduler = new TestScheduler(assert.deepEqual);
    // Given we have a socket server and redis client as parameter
    const fakeIO = "fakeIO";
    const fakeRedisClient = "fakeRedisClient";

    // And a stream of client's connection
    const connections = scheduler.createColdObservable("--x---y--", {
      x: "fakeSocket1",
      y: "fakeSocket2",
    });
    const onConnection = td.function();
    td.when(onConnection(fakeIO)).thenReturn(connections);

    // And a stream of client's initializeUser requests
    const initialUserRequest1$ = scheduler.createColdObservable("--x------", {
      x: { userId: "userId1", userName: "daredevil" },
    });
    const initialUserRequest2$ = scheduler.createColdObservable("---x-----", {
      x: { userId: "userId2", userName: "punisher" },
    });
    const onInitialUser = td.function();
    td.when(onInitialUser("fakeSocket1")).thenReturn(initialUserRequest1$);
    td.when(onInitialUser("fakeSocket2")).thenReturn(initialUserRequest2$);

    // And a stream of response for query user namespace in store
    const namespaceResponse1$ = scheduler.createColdObservable("--x---", {
      x: "LandingPage",
    });
    const namespaceResponse2$ = scheduler.createColdObservable("-x----", {
      x: "Game:room42",
    });
    const getUserNameSpace = td.function();
    td.when(getUserNameSpace(fakeRedisClient, "userId1")).thenReturn(namespaceResponse1$);
    td.when(getUserNameSpace(fakeRedisClient, "userId2")).thenReturn(namespaceResponse2$);

    // And a stream of
  });
});
