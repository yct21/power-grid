import * as td from "testdouble";
import * as Rx from "rxjs/Rx";
import { assert } from "chai";
import { Store } from "store";

describe("store/index", () => {
  it("Feature: it could create a store", () => {
    const scheduler = new Rx.TestScheduler(assert.deepEqual);
    const get$ = td.function();
    const smembers$ = td.function();

    // Given we could create a redis client
    const redisClient = "redisClient";
    const createRedisClient = () => redisClient;

    // And we could get gameId of all gameRooms
    const gameRoomIdList = ["1", "42", "1024"];
    const gameRoomIdList$ = scheduler.createColdObservable("x|", { x: gameRoomIdList });
    td.when(smembers$(redisClient, "gameRooms")).thenReturn(gameRoomIdList$);

    // And we could get all game rooms in redis according to its id
    const gameRooms = [
      { id: "1", value: "game room 1" },
      { id: "42", value: "game room 42" },
      { id: "1024", value: "game room 1024" },
    ];
    const gameRooms1$ = scheduler.createColdObservable("x|", { x: JSON.stringify(gameRooms[0]) });
    const gameRooms42$ = scheduler.createColdObservable("x|", { x: JSON.stringify(gameRooms[1]) });
    const gameRooms1024$ = scheduler.createColdObservable("x|", { x: JSON.stringify(gameRooms[2]) });
    td.when(get$(redisClient, "gameRoom:1")).thenReturn(gameRooms1$);
    td.when(get$(redisClient, "gameRoom:42")).thenReturn(gameRooms42$);
    td.when(get$(redisClient, "gameRoom:1024")).thenReturn(gameRooms1024$);

    // And we take a break and do some mokist tdd
    td.replace("utils/redis", {
      createRedisClient,
      get$,
      smembers$,
    });

    // When creating store
    const store$: Rx.Observable<Store> = require("../index").createStore$();

    // Then it contains redicClient
    // And it contains game rooms

    scheduler.expectObservable(store$).toBe("x|", { x: {
      redisClient,
      gameRooms: {
        1: gameRooms[0],
        42: gameRooms[1],
        1024: gameRooms[2],
      },
    }});

    scheduler.flush();
  });
});
