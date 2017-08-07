import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/combineLatest";
import { Store } from "LandingPage/store";

export interface Model {
  userName: string,
  onlineNum: number,
}

export function model(store: Store): Observable<Model> {
  const { userName$, onlineNum$ } = store.props;

  return userName$.combineLatest(onlineNum$, (userName, onlineNum) => ({
    userName, onlineNum
  }));
}
