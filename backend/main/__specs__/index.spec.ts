import * as td from "testdouble";

describe("main/index", () => {
  it("Feature: it sets up business layer of App", () => {
    // Given we have a store and socket object as arguments
    const store = "store";
    const socket = "socketServer";

    // And we could set up logics for connections
    const setupConnection = td.function();
    td.replace("main/connection", { setupConnection });

    // And we could set up logics for game room, like creating a game, etc.
    const setupGameRoom = td.function();
    td.replace("main/gameRoom", { setupGameRoom });

    // And we could set up logics for games, like player makes a move, etc.
    const setupGame = td.function();
    td.replace("main/game", { setupGame });

    // When running app
    require("../index").runApp(store, socket);

    // Then user connection logic is set up
    td.verify(setupConnection(store, socket));

    // And game room logic is set up
    td.verify(setupGameRoom(store, socket));

    // And game logic is set up
    td.verify(setupGame(store, socket));
  });
});
