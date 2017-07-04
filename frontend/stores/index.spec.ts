import * as td from "testdouble";
import { assert } from "chai";
import { TestScheduler } from "rxjs/testing/TestScheduler";

describe("frontend/stores", () => {
  it("could create a temporary store at start up", () => {
    // Given we can create a StartupTempStore
    const fakeCreateStartupTempStore = td.function("fakeCreateStartupTempStore");
    const fakeStore = "fakeStore";
    td.when(fakeCreateStartupTempStore()).thenReturn(fakeStore);
    td.replace("stores/startupTempStore", { createStartupTempStore: fakeCreateStartupTempStore });

    // And DOMSource is provided
    const fakeDomSource = "fakeDomSource";

    // When createStore is called
    const { createStore } = require("./index");
    const store$ = createStore(fakeDomSource);

    // Then it returns a StartupTempStore
    const scheduler = new TestScheduler(assert.deepEqual);
    scheduler.expectObservable(store$).toBe("x-", {x: fakeStore});
    scheduler.flush();
  });
});
