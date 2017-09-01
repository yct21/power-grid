import * as td from "testdouble";

describe("index", () => {
  it("Feature: it start up the whole application", () => {
    // Given we could create a socket
    const fakeServer = "fakeServer";
    const createServer = td.function();
    td.when(createServer()).thenReturn(fakeServer);
    td.replace("utils/socketIO", { createServer });

    // And we could create a redis client
    const fakeRedisClient = "fakeRedisClient";
    const createRedisClient = td.function();
    td.when(createRedisClient()).thenReturn(fakeRedisClient);
    td.replace("utils/redis", { createRedisClient });

    // And we could manage our user connections
    const fakeSetupSocketServer = td.function();
    td.replace("socket", { setupSocketServer: fakeSetupSocketServer });

    // When invoking backend
    require("../index");

    // Then it sets up user connection
    td.verify(fakeSetupSocketServer(fakeServer, fakeRedisClient));
  })
});
