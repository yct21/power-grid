import { DOMSource } from "@cycle/dom/rxjs-typings";
import { Store } from "LandingPage/store";
import { view } from "LandingPage/NameForm/view";
import { model } from "LandingPage/NameForm/model";
import { userNameFieldInput } from "LandingPage/NameForm/style.css";

interface Sources {
  store: Store,
  DOM: DOMSource,
}

export function NameForm(sources: Sources) {
  return {
    DOM: view(model(sources.store)),
  };
}

const userNameField = userNameFieldInput.split(" ")[0];

export {
  userNameField,
};
