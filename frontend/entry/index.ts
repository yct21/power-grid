import { makeDOMDriver } from "@cycle/dom";
import { run } from "@cycle/rxjs-run";
import MainComponent  from "entry/MainComponent";

// This is the entry of frontend part.
// We should start up our application here.

const dom = makeDOMDriver("#app");
run(MainComponent, {
  DOM: dom,
})
