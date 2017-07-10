export interface StartupTempStore {
  storeName: "StartupTempStore",
}

export interface LandingPageStore {
  storeName: "LandingPageStore",
}

export interface GamePageStore {
  storeName: "GamePageStore",
}

export type Store = StartupTempStore | LandingPageStore | GamePageStore;
