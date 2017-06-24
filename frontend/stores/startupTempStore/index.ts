import { action } from "mobx";

export interface StartupTempStore {
  storeName: "StartupTempStore",
  someContent: string,
}

export function createStartupTempStore(): StartupTempStore {
  return {
    storeName: "StartupTempStore",
    someContent: "meow",
  };
}

export const modifyContent = action(
  "modifyContent",
  (startupTempStore: StartupTempStore): undefined => {
  startupTempStore.someContent += "!";
  console.log("meow!");
  return undefined;
});
