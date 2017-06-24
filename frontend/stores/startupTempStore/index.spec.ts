import { StartupTempStore, createStartupTempStore } from "./index";

describe("stores/startupTempStore", () => {
  test("We could initialize a startupTempStore", () => {
    // no given
    // when
    const store: StartupTempStore = createStartupTempStore();

    // then
    expect(store).toEqual({
      storeName: "StartupTempStore",
    });
  });
})
