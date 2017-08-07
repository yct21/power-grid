import { DOMSource } from "@cycle/dom/rxjs-typings";
import { Store } from "LandingPage/store";
import { model } from "LandingPage/Header/model";
import { view } from "LandingPage/Header/view";

interface Sources {
  DOM: DOMSource,
  store: Store,
};

export function Header(sources: Sources) {
  const dom$ = view(model(sources.store));

  return {
    DOM: dom$,
  }
}
