export interface StartupTempStore {
  storeName: "StartupTempStore",
}

export function createStartupTempStore(): StartupTempStore {
  return {
    storeName: "StartupTempStore",
  };
}
