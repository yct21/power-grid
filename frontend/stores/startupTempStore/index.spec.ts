import { isObservable } from "mobx";
import { createStartupTempStore } from "./index";

describe("stores/startupTempStore", () => {
  test("We could initialize a startupTempStore", () => {
    // no given
    // when createStartupTempStore is called
    const store = createStartupTempStore();

    // then it return a expected value
    expect(store).toEqual({
      storeName: "StartupTempStore",
    });

    // and it is converted to a Mobx observable
    expect(isObservable(store)).toBeTruthy();
  });
})
