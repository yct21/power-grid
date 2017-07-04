import { BehaviorSubject } from "rxjs/BehaviorSubject";
import "rxjs/add/observable/of";
import { DOMSource } from "@cycle/dom/rxjs-typings";
import { StartupTempStore, createStartupTempStore } from "stores/startupTempStore";

export type Store = StartupTempStore;

export function createStore(domSource: DOMSource): BehaviorSubject<Store> {
  const store = createStartupTempStore();
  return new BehaviorSubject(store);
}
