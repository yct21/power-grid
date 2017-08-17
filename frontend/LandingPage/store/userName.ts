import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { DOMSource } from "@cycle/dom/rxjs-typings";
import { getUserName } from "localStorage";
import * as userNameEvents from "LandingPage/NameForm/intent";

export interface UserName {
  // The value of userName
  value$: BehaviorSubject<string>,

  // Whether user is focus on userName
  focus$: BehaviorSubject<boolean>;
}

function value(DOM: DOMSource) {
  const value$ = new BehaviorSubject(getUserName());

  userNameEvents.changeUserName(DOM).subscribe(value$);

  return value$;
}

function focus(DOM: DOMSource) {
  const focus$ = new BehaviorSubject(false); // App is started with nothing focused

  userNameEvents.focusOnUserName(DOM).subscribe(focus$);

  return focus$;
}

export function userName(DOM: DOMSource): UserName {
  return {
    focus$: focus(DOM),
    value$: value(DOM),
  };
}
