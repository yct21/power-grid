import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/combineLatest";
import { Store } from "LandingPage/store";

export type Model =
  { networkStatus: "offline" | "online" };

export function model(store: Store): Observable<Model> {
  return store.networkStatus$.map((networkStatus) => ({ networkStatus }));
}
