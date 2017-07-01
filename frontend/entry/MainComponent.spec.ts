import * as td from "testdouble";
import { assert } from "chai";

describe("entry/MainComponent", () => {
  it("renders mainFrame correctly", () => {
    // Given we have could create a store with current domSource
    const fakeDomSource = "fakeDomSource";

    const fakeStore = "fakeStore";
    const fakeCreateStore = td.function("createStore");
    td.when(fakeCreateStore(fakeDomSource)).thenReturn(fakeStore);
    td.replace("stores", { createStore: fakeCreateStore });

    // And we have a router component
    const fakeRouterComponent = td.function("fakeRouterComponent");
    const fakeRouterDom = "fakeRouterDom";
    td.when(fakeRouterComponent({ DOM: fakeDomSource, props: fakeStore }))
      .thenReturn({ DOM: fakeRouterDom });
    td.replace("router", { default: fakeRouterComponent });

    // When we render MainComponent
    const MainComponent = require("./MainComponent").default;
    const renderedMainComponent = MainComponent({ DOM: fakeDomSource });

    // Then it create a store with current domSource
    // And render router component with this store as properties.
    // And return the DOM of router as its own DOM
    assert.deepEqual(renderedMainComponent, { DOM: fakeRouterDom });
  });
});
