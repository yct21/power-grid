import { TestScheduler } from "rxjs/Testing/TestScheduler";
import * as td from "testdouble";
import { assert } from "chai";

describe("LandingPage/store/username", () => {
  it("Feature: it could create a stream of Module UserName", () => {
    const scheduler = new TestScheduler(assert.deepEqual);

    // Given we could get initial userName from storage
    const fakeInitialUserName = "fakeInitialUserName";
    td.replace("localStorage", { getUserName: () => fakeInitialUserName });

    // And a stream of userName input by user
    const fakeDom = "fakeDom";

    const names = {
      a: "starbuck",
      b: "appolo",
      c: "longshot",
    };
    const changeUserName = td.function("changeUserName");
    const changed$ = scheduler.createColdObservable("--a-b--c-", names);
    td.when(changeUserName(fakeDom)).thenReturn(changed$);

    // And a stream of userName field gets focused or unfocused
    const focusOnUserName = td.function("focusOnUserName");
    const focused$ = scheduler.createColdObservable("--t--f-t--f--t--f--", { t: true, f: false });
    td.when(focusOnUserName(fakeDom)).thenReturn(focused$);

    td.replace("LandingPage/NameForm/intent", {
      changeUserName,
      focusOnUserName,
    });

    // When creating userName()
    const { value$, focus$ } = require("../userName").userName(fakeDom);

    // Then it returns a stream for userName value
    scheduler.expectObservable(value$).toBe(
      "x-a-b--c-",
      { ...names, x: fakeInitialUserName }
    );

    // And returns a stream for userName gets focused or unfocused
    scheduler.expectObservable(focus$).toBe("f-t--f-t--f--t--f--", { t: true, f: false });

    scheduler.flush();
  })
})
