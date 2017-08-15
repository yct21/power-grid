import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import "rxjs/add/operator/mapTo";
import "rxjs/add/operator/map";
import "rxjs/add/observable/merge";
import { DOMSource } from "@cycle/dom/rxjs-typings";
import { getUserName } from "localStorage";
import { userNameField } from "LandingPage/NameForm";

export interface UserName {
  // The value of userName
  value$: BehaviorSubject<string>,

  // Whether user is focus on userName
  focus$: BehaviorSubject<boolean>;
}

function value(userNameFieldSource: DOMSource) {
  const value$ = new BehaviorSubject(getUserName());

  userNameFieldSource
    .events("input")
    .map((ev: Event) => (ev.target as HTMLInputElement).value)
    .subscribe(value$);

  return value$;
}

function focus(userNameFieldSource: DOMSource) {
  const focus$ = new BehaviorSubject(false); // App is started with nothing focused

  Observable
    .merge(
      userNameFieldSource.events("focus").mapTo(true),
      userNameFieldSource.events("blur").mapTo(false),
    )
    .subscribe(focus$);

  return focus$;
}

export function userName(DOMSource: DOMSource): UserName {
  const userNameFieldSource = DOMSource.select(`.${userNameField}`);

  return {
    focus$: focus(userNameFieldSource),
    value$: value(userNameFieldSource),
  };
}
