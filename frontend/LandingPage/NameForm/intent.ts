import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/mapTo";
import "rxjs/add/operator/map";
import "rxjs/add/observable/merge";
import "rxjs/add/operator/distinct";
import { DOMSource } from "@cycle/dom/rxjs-typings";
import { userNameFieldInput } from "LandingPage/NameForm/style.css";

const userNameFieldCssClass = `.${userNameFieldInput.split(" ")[0]}`;

export function changeUserName(DOM: DOMSource): Observable<string> {
  return DOM
    .select(userNameFieldCssClass)
    .events("input")
    .map((ev: Event) => (ev.target as HTMLInputElement).value);
}

export function focusOnUserName(DOM: DOMSource): Observable<boolean> {
  const focus$ = DOM.select(userNameFieldCssClass).events("focus").mapTo(true);
  const unfocus$ = DOM.select(userNameFieldCssClass).events("blur").mapTo(false);

  return Observable.merge(focus$, unfocus$).distinct();
}
