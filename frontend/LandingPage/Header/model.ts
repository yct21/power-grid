import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/combineLatest";
import { Store } from "LandingPage/store";

export type Model =
  { networkStatus: "online", onlineNum: number } |
  { networkStatus: "offline" };

export function model(store: Store): Observable<Model> {
  return Observable.combineLatest(
    store.props.onlineNum$,
    store.props.networkStatus$,
    (onlineNum, networkStatus) => {
      if (networkStatus === "online") {
        return { networkStatus, onlineNum } as Model;
      } else if (networkStatus === "offline") {
        return { networkStatus } as Model;
      } else {
        throw new Error("Invalid network status");
      }
    }
  );
}
