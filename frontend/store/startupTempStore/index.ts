import { StartupTempStore } from "store/types";

// It returns plain js object instead of a Observable,
// since it is only used to be the initial value of store.
export function createStartupTempStore(): StartupTempStore {
  const initialValue: StartupTempStore = { storeName: "StartupTempStore" };

  return initialValue;
}
