import * as td from "testdouble";
import { TestScheduler } from "rxjs/testing/TestScheduler";
import { assert } from "chai";

describe("frontend/store/intent", () => {
  it("Feature: It has a stream `connectSocket$`", () => {
    // Given we can invoke some handler when socket connects
    const scheduler = new TestScheduler(assert.deepEqual);
    const fakeOnConnect = (socket: string, handler: () => void) => {
      const connect$ = scheduler.createColdObservable("---x---");
      connect$.subscribe(() => {
        handler();
      });
    }
    td.replace("socket", { onConnect: fakeOnConnect });

    // and proper stubbed parameter for intent function
    const fakeDomSource = "fakeDomSource";
    const fakeSocket = "fakeSocket";

    // When get this stream from intent
    const { intent } = require("./intent");
    const { connectSocket$ } = intent(fakeDomSource, fakeSocket);

    // Then it will emit event when connects
    scheduler.expectObservable(connectSocket$).toBe(
      "---(x|)---",
      { x: { event: "connect_socket" } },
    );

    scheduler.flush();
  })
});
