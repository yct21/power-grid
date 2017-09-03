import * as td from "testdouble";

/*
  Although we are not supposed to mock things we don't own,
  like @cycle/rxjs-run or @cycle/dom.

  But since they are the most basic APIs of cycle.js I'm not going to wrap
  them up like they did it in textbook for the quality of life.
  Checking wether the whole App has being rendered is left to feature tests.
  */
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

    // And we have style sheets
    td.replace("entry/styles/index.css", null);

    // And we can render the MainComponent by running it with driver
    const fakeRun = td.function("run");
    td.replace("@cycle/rxjs-run", { run: fakeRun });

    // When application is started
    require("../index");

    // Then it should make a domdriver
    // And initialize a store with this domdriver
    // And call rxjs-run with MainComponent and this store
    td.verify(fakeRun(
      fakeMainComponent, {
        DOM: dom,
      }
    ));
  })
})
