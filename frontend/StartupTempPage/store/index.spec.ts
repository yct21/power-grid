import { assert } from "chai";

describe("stores/startupTempstore/index", () => {
  it("could create a temporary store when application starts", () => {
    // When creating startupTempStore
    const { createStartupTempStore } = require("./index");
    const store$ = createStartupTempStore();

    // Then it should create a BehaviorSubject with simple plain value
    assert.deepEqual(store$.getValue(), { storeName: "StartupTempStore" });
  });
});
