import { DOMSource } from "@cycle/dom/rxjs-typings";
import { Store } from "LandingPage/store";
import { intent } from "LandingPage/NameForm/intent";
import { view } from "LandingPage/NameForm/view";
import { model } from "LandingPage/NameForm/model";

interface Sources {
  store: Store,
  DOM: DOMSource,
}

export function NameForm(sources: Sources) {
  intent(sources.DOM, sources.store);

  return {
    DOM: view(model(sources.store)),
  };
}
