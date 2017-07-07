// We are only expecting connected event when application started.
export interface StartupTempStore {
  storeName: "StartupTempStore",
}

export function createStartupTempStore(): StartupTempStore {
  const initialValue: StartupTempStore = { storeName: "StartupTempStore" };

  return initialValue;
}
