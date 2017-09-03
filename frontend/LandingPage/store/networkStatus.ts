import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { NetworkStatus, networkStatus$ } from "socket/networkStatus";

export function networkStatus(): BehaviorSubject<NetworkStatus> {
  return networkStatus$();
}
