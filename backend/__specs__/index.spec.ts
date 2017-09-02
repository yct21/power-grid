import * as td from "testdouble";

describe("index", () => {
  it("Feature: it start up the application", () => {
    // Given we could create a store
    const store = "store";
    const createStore = td.function();
    td.when(createStore()).thenReturn(store);
    td.replace("store", { createStore });

    // And we could create a socket server
    const socketServer = "socketServer";
    const createSocketServer = td.function();
    td.when(createSocketServer()).thenReturn(socketServer); // We should really write a macro
    td.replace("socket", { createSocketServer });

    // And we could run up this app
    const runApp = td.function();
    td.replace("main", { runApp });

    // When the backend is on
    require("../index");

    // Then `runApp` is called with proper arguments
    td.verify(runApp(store, socketServer));
  })
});
