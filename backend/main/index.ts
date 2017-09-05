import { Store } from "store";
import { Socket } from "socket";
import { setupConnection } from "main/connection";
import { setupGameRoom } from "main/gameRoom";
import { setupGame } from "main/game";

export function runApp(store: Store, socket: Socket) {
  setupConnection(store, socket);
  setupGameRoom(store, socket);
  setupGame(store, socket);
}
