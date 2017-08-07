import { TestScheduler } from "rxjs/Testing/TestScheduler";
import * as td from "testdouble";
import { assert } from "chai";

describe("LandingPage/store/username", () => {
  it("Feature: it could create a stream of userName", () => {
    const scheduler = new TestScheduler(assert.deepEqual);

    // Given we could get initial userName from storage
    const fakeInitialUserName = "fakeInitialUserName";
    td.replace("localStorage", { getUserName: () => fakeInitialUserName });

    // And a stream of userName input by user
    const names = {
      a: "starbuck",
      b: "appolo",
      c: "longshot",
    };
    const input$ = scheduler.createColdObservable("--a-b--c-", names);

    // When creating userName()
    const { changeUserName$, userName$ } = require("../userName").userName();

    // Then it returns a subject for streaming changeUserName event
    // And a stream for userName value
    input$.subscribe(changeUserName$);
    scheduler.expectObservable(userName$).toBe(
      "x-a-b--c-",
      { ...names, x: fakeInitialUserName }
    );

    scheduler.flush();
  })
})
