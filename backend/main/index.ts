import { Store } from "store";
import { Server } from "socket";
import { setupConnection } from "main/connection";
import { setupGameRoom } from "main/gameRoom";
import { setupGame } from "main/game";

export function runApp(store: Store, server: Server) {
  setupConnection(store, server);
  setupGameRoom(store, server);
  setupGame(store, server);
}
