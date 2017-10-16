import * as debug from "debug";
import { Server } from "socket";
import { Store } from "store";
import { User } from "store/user";
import * as socket from "socket";

const homepage = "page:homepage";

interface ConnectedUser {
  userId: string,
  namespace: string,
};

function getPageParams({userId, namespace}: ConnectedUser) {
  if (namespace === homepage) {

  }
}

export function setupConnection(store: Store, server: Server): void {
  const logConnection = debug("main:connection");

  const userConnected$ = socket.userConnected$(server);
  // userConnected
  // get page data
  // send page data
  // subscribe

  // When user connected to server
  userConnected$
    // fetch data of page requested
    .mergeMap((userId: string) => getPageData(user))
    // send data to client
    .mergeMap((user: User) => socket.send(socket, user))
    // and that's it
    .subscribe((user: User) => logConnection(`user connected: ${user.id}`));
}
