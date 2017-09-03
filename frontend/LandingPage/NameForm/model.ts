import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/combineLatest";
import { Store } from "LandingPage/store";

export interface Model {
  userName: string,
  userNameFocus: boolean,
  onlineNum: number,
}

export function model(store: Store): Observable<Model> {
  return Observable.combineLatest(
    [store.userName.value$, store.userName.focus$, store.onlineNum$],
    (userName: string, userNameFocus: boolean, onlineNum: number) => ({
      userName, userNameFocus, onlineNum
    }),
  );
}
