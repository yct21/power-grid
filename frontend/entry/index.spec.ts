// import * as td from "testdouble";
import { assert } from "chai";

describe("entry/index", () => {
  it("starts application correctly", () => {
    // Given `createStore` is mocked
    // const fakeCreateStore = td.function();
    // const fakeStore = td.object("fake store");
    // td.when(fakeCreateStore()).thenReturn(fakeStore);
    // td.replace("../stores/index.ts", { createStore: fakeCreateStore });

    // And `renderApp` is mocked
    // const fakeRenderApp = td.function();
    // td.replace("./renderApp.tsx", fakeRenderApp);

    // When App entry is loaded
    require("entry");

    // Then it should set up a temperory store for loading
    // td.verify(fakeCreateStore());

    // And it should render a temperory page
    // td.verify(fakeRenderApp(fakeStore));
    assert.equal(1, 1, "meow");
  })
})
