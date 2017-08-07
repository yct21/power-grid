import { Subject } from "rxjs/Subject";
import { getUserName } from "localStorage";

export function userName() {
  const changeUserName$: Subject<string> = new Subject();
  const userName$ = changeUserName$.asObservable().startWith(getUserName());

  return {
    changeUserName$,
    userName$,
  };
}
