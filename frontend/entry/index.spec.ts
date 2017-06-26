import * as td from "testdouble";

describe("entry/index", () => {
  it("starts application correctly", () => {
    // Given `createStore` is mocked
    const fakeCreateStore = td.function("fake create store");
    const fakeStore = "fakeStore";
    td.when(fakeCreateStore()).thenReturn(fakeStore);
    td.replace("stores", { createStore: fakeCreateStore });

    // And `renderApp` is mocked
    const fakeRenderApp = td.function("fake renderApp");
    td.replace("entry/renderApp", { default: fakeRenderApp });

    // When App entry is loaded
    require("./index");

    // Then it should set up a temperory store for loading
    //// Unnecessary: https://github.com/testdouble/testdouble.js/blob/master/docs/B-frequently-asked-questions.md#why-shouldnt-i-call-both-tdwhen-and-tdverify-for-a-single-interaction-with-a-test-double
    // td.verify(fakeCreateStore());

    // And it should render a temperory page with this store
    td.verify(fakeRenderApp(fakeStore));
  })
})
