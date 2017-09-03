import generate = require("nanoid/generate");
import * as cookies from "js-cookie";

const userIdLength = 21;
const userNameLength = 8;

function getItemFromStorageOrCookie(itemKey: string, length: number, prefix: string = ""): string {
  let item: string | null = null;
  const allowSymbols =
    "0123456789" +
    "abcdefghijklmnopqrstuvwxyz" +
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  if (localStorage) {
    item = localStorage.getItem(itemKey);

    if (!item) {
      item = prefix.concat(generate(allowSymbols, length));
      localStorage.setItem(itemKey, item);
    }
  } else {
    item = cookies.get("userId");

    if (!item) {
      item = prefix.concat(generate(allowSymbols, length));
      cookies.set(itemKey, item);
    }
  }

  return item as string;
}

const userId = getItemFromStorageOrCookie("userId", userIdLength);
const userName = getItemFromStorageOrCookie("userName", userNameLength, "Player_");

export function getUserId() {
  return userId;
}

export function getUserName() {
  return userName;
}
