import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/startWith";
import { refreshOnlineNum$ } from "socket/refreshOnlineNum";
import { NetworkStatus, networkStatus$ } from "socket/networkStatus";

interface StoreProps {
  onlineNum$: Observable<number>,
  networkStatus$: Observable<NetworkStatus>,

}

export interface InitialParams {
  onlineNum: number,
}

export interface Store {
  props: StoreProps,
}

export function createStore(initialParams: InitialParams) {
  const props: StoreProps = {
    onlineNum$: refreshOnlineNum$().startWith(initialParams.onlineNum),
    networkStatus$: networkStatus$(),
  };

  return {
    props,
  }
}
