import * as td from "testdouble";
import * as Rx from "rxjs/Rx";
import { assert } from "chai";

describe("socket", () => {
  it("Feature: it could create a socket server", () => {
    const scheduler = new Rx.TestScheduler(assert.deepEqual);
    // Given we could create a socket server in SocketIO
    const socketServer = "socketServer";
    const createServer = () => socketServer;
    td.replace("utils/socketIO", { createServer });

    // When creating socket server
    const io$ = require("../index").createSocketServer$();

    // Then returning the Socket object
    scheduler.expectObservable(io$).toBe("(x|)", { x: {io: socketServer} });

    scheduler.flush();
  });
});
