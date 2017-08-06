import * as uuid from "uuid/v4";
import * as cookies from "js-cookie";

function getItemFromStorageOrCookie(itemKey: string): string {
  let item: string | null = null;

  if (localStorage) {
    item = localStorage.getItem(itemKey);

    if (!item) {
      item = uuid();
    }

    localStorage.setItem(itemKey, item);
  } else {
    item = cookies.get("userId");

    if (!item) {
      item = uuid();
    }

    cookies.set(itemKey, item);
  }

  return item as string;
}

const userId = getItemFromStorageOrCookie("userId");
const userName = getItemFromStorageOrCookie("userName");

export function getUserId() {
  return userId;
}

export function getUserName() {
  return userName;
}
