import { HomePageStore } from "stores/homePageStore";
import { StartupTempStore, createStartupTempStore } from "stores/startupTempStore";

export type Store = StartupTempStore | HomePageStore;

export function createStore(): Store {
  return createStartupTempStore();
}
