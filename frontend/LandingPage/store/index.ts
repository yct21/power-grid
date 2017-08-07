import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/startWith";
import { refreshOnlineNum$ } from "socket/refreshOnlineNum";
import { NetworkStatus, networkStatus$ } from "socket/networkStatus";
import { userName } from "LandingPage/store/userName";

interface StoreProps {
  onlineNum$: Observable<number>,
  networkStatus$: Observable<NetworkStatus>,
  userName$: Observable<String>,
}

interface StoreEvents {
  changeUserName$: Subject<string>,
}

export interface InitialParams {
  onlineNum: number,
}

export interface Store {
  props: StoreProps,
}

function onlineNum(initialOnlineNum: number) {
  return {
    onlineNum$: refreshOnlineNum$().startWith(initialOnlineNum),
  }
}

export function createStore(initialParams: InitialParams) {
  const { onlineNum$ } = onlineNum(initialParams.onlineNum);
  const { changeUserName$, userName$ } = userName();

  const events: StoreEvents = {
    changeUserName$,
  };

  const props: StoreProps = {
    onlineNum$,
    networkStatus$: networkStatus$(),
    userName$,
  };

  return {
    props,
    events,
  }
}
