import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { refreshOnlineNum$ } from "socket/refreshOnlineNum";

export function onlineNum(initialOnlineNum: number): BehaviorSubject<number> {
  const onlineNum$ = new BehaviorSubject(initialOnlineNum);
  refreshOnlineNum$().subscribe(onlineNum);

  return onlineNum$;
}
