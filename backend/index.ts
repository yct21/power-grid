import * as Rx from "rxjs/Rx";
import { createStore$ } from "store";
import { createSocketServer$ } from "socket";
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

  We put "entry" of server part in "main" (business logic) module.
  We could do it since this App is heavily based on rxjs.
  */

// Why we have to use rxjs instead of promise...
Rx.Observable.zip(createStore$(), createSocketServer$())
  .first()
  .subscribe(([store, socketServer]) => {
    runApp(store, socketServer);
  });
