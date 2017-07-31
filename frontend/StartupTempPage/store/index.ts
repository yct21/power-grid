import { BehaviorSubject } from "rxjs/BehaviorSubject";

export interface StartupTempStore {
  storeName: "StartupTempStore",
}

// It returns plain js object instead of a Observable,
// since it is only used to be the initial value of store.
export function createStartupTempStore(): BehaviorSubject<StartupTempStore> {
  const initialValue: StartupTempStore = { storeName: "StartupTempStore" };

  return new BehaviorSubject(initialValue);
}
