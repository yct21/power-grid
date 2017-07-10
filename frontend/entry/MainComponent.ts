import { Sources } from "@cycle/run";
import { createStore } from "store";
import Router from "router";

// Initialize store and render router
export default function MainComponent(sources: Sources) {
  const domSource = sources.DOM;
  const store$ = createStore(domSource);

  const router = Router({ DOM: domSource, props: store$ });

  return { DOM: router.DOM };
}
