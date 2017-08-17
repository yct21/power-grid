import { TestScheduler } from "rxjs/Testing/TestScheduler";
import * as td from "testdouble";
import { assert } from "chai";

describe("LandingPage/store/onlineNum", () => {
  it("Feature: it could return a stream of onlineNum", () => {
    const scheduler = new TestScheduler(assert.deepEqual);

    // Given we have a initial online number from parameter
    const initialOnlineNum = 42;

    // and a stream of onlineNum from server
    const onlineNumFromServer$ = scheduler.createColdObservable("---1-2-3---5--4--");
    const refreshOnlineNum$ = () => onlineNumFromServer$;
    td.replace("socket/refreshOnlineNum", { refreshOnlineNum$ });

    // When creating onlineNum$
    const onlineNum$ = require("../onlineNum").onlineNum(initialOnlineNum);

    // Then it returns a stream of online number
    scheduler.expectObservable(onlineNum$).toBe("i--1-2-3---5--4--", { i: 42 });

    scheduler.flush();
  })
})
