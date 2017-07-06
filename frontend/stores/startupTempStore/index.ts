import { BehaviorSubject } from "rxjs/BehaviorSubject";

// We are only expecting connected event when application started.
export interface StartupTempStore {
  storeName: "StartupTempStore",
}

export function createStartupTempStore(): BehaviorSubject<StartupTempStore> {
  const initialValue: StartupTempStore = { storeName: "StartupTempStore" };

  return new BehaviorSubject(initialValue);
}
