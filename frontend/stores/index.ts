import { StartupTempStore, createStartupTempStore } from "stores/startupTempStore";

export type Store = StartupTempStore;

export function createStore(): Store {
  return createStartupTempStore();
}
