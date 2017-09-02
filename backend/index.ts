import { createStore } from "store";
import { createSocketServer } from "socket";
import { runApp } from "main";

/*

     +-----------------+
     |      main       |
     |(Business logic) |<----------------+
     +-----------------+                 |
              ^                          |
              |                          |
              |                          v
              v                +------------------+
     +-----------------+       |                  |
     |      store      |       |      socket      |     +-----------------+
     +-----------------+       |(socketIO/express)|<--->|     client      |
              ^                |                  |     +-----------------+
      +-------+-------+        +------------------+
      |               |
      v               v
  +-------+       +------+
  | redis |       | heap |
  +-------+       +------+

  */

const store = createStore();
const socketServer = createSocketServer();

runApp(store, socketServer);
