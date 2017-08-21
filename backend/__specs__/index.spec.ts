import * as td from "testdouble";

describe("index", () => {
  it("Feature: it start up the whole application", () => {
    // Given we could create a socket
    const fakeServer = "fakeServer";
    const createServer = td.function();
    td.when(createServer()).thenReturn(fakeServer);
    td.replace("socket", { createServer });

    // And we could create a redis client
    const fakeRedisClient = "fakeRedisClient";
    const createRedisClient = td.function();
    td.when(createRedisClient()).thenReturn(fakeRedisClient);
    td.replace("store", { createRedisClient });

    // And we could manage our user connections
    const fakeSetupUserConnection = td.function();
    td.replace("user/connection", { setupUserConnection: fakeSetupUserConnection });

    // When invoking backend
    require("../index");

    // Then it sets up user connection
    td.verify(fakeSetupUserConnection(fakeServer, fakeRedisClient));
  })
});
