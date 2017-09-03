import * as td from "testdouble";
import * as Rx from "rxjs/Rx";
import { assert } from "chai";

describe("index", () => {
  it("Feature: it start up the application", (done) => {
    // Given we could create a store
    const store$ = Rx.Observable.create((observer: Rx.Observer<string>) => {
      observer.next("store");
    });
    const createStore$ = td.function();
    td.when(createStore$()).thenReturn(store$);
    td.replace("store", { createStore$ });

    // And we could create a socket server
    const socketServer$ = Rx.Observable.create((observer: Rx.Observer<string>) => {
      observer.next("socketServer");
    });
    const createSocketServer$ = td.function();
    td.when(createSocketServer$()).thenReturn(socketServer$);
    td.replace("socket", { createSocketServer$ });

    // And we could run up this app
    const runApp = (arg1: string, arg2: string) => {
      assert.equal(arg1, "store");
      assert.equal(arg2, "socketServer");
      done();
    }
    td.replace("main", { runApp });

    // When the backend is online
    require("../index");

    // Then `runApp` is called with proper arguments
    // Did it in `runApp` stub. Please don't do it again.
  })
});
