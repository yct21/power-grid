import * as td from "testdouble";

describe("entry/index", () => {
  it("starts application correctly", () => {
    // Given we have a MainComponent to render
    const fakeMainComponent = "mainComponent";
    td.replace("entry/MainComponent", { default: fakeMainComponent });

    // And we could make a DOMDriver of cycle.js
    const dom = "dom";
    const fakeMakeDomDriver = td.function("makeDomDriver");
    td.when(fakeMakeDomDriver("#app")).thenReturn(dom);
    td.replace("@cycle/dom", { makeDOMDriver: fakeMakeDomDriver });

    // And we can render the MainComponent by running it with driver
    const fakeRun = td.function("run");
    td.replace("@cycle/rxjs-run", { run: fakeRun });

    // When application is started
    require("./index");

    // Then it should make a domdriver
    // And initialize a store with this domdriver
    // And call rxjs-run with maincomponent and this store
    td.verify(fakeRun(
      fakeMainComponent, {
        DOM: dom,
      }
    ));
  })
})
