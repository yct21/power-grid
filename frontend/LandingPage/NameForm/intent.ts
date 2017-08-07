import { DOMSource } from "@cycle/dom/rxjs-typings";
import { userNameField } from "LandingPage/NameForm/style.css";
import { Store } from "LandingPage/store";

export function intent(DOM: DOMSource, store: Store) {
  DOM
    .select(`.${userNameField} input`)
    .events("change")
    .map((ev) => (ev.target as HTMLInputElement).value)
    .subscribe(store.events.changeUserName$);
}
