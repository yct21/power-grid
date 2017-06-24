import { HomePageStore } from "stores/homePageStore";

export type Store = HomePageStore;

function createStore(currentGameId: string): void;
function createStore(currentGameId: void): HomePageStore;
function createStore(currentGameId: string | void): HomePageStore | void {
  if (typeof(currentGameId) !== "string") {
    return {
      joinGameId: "1"
    };
  }
}

export {
  createStore,
};
