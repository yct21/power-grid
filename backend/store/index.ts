import * as Rx from "rxjs/Rx";
import { RedisClient } from "redis";
import { GameRoom, parseRoom } from "store/gameRoom";
import * as redis from "utils/redis";

/*
  Application state

  - gameRooms

  */

export interface Store {
  redisClient: RedisClient,
  onlineNum: number,
  gameRooms: {
    [gameId: string]: GameRoom,
  }
};

function getRoomIdList$(redisClient: RedisClient) {
  return redis.smembers$(redisClient, "gameRooms");
}

function getRoom$(redisClient: RedisClient, roomId: string): Rx.Observable<GameRoom> {
  return redis.get$(redisClient, `gameRoom:${roomId}`)
    .map(parseRoom);
}

function getRooms$(redisClient: RedisClient, roomIdList: string[]) {
  const mapGetRoom = (roomId: string) => getRoom$(redisClient, roomId);
  return Rx.Observable.combineLatest(roomIdList.map(mapGetRoom))
    .map((roomList) => Object.assign({}, ...roomList.map((room) => ({[room.id]: room}))))
}

export function createStore$(): Store {
  const redisClient = redis.createRedisClient();

  return getRoomIdList$(redisClient)
    .first() // Not needed actually
    .mergeMap((gameRoomIdList: string[]) => getRooms$(redisClient, gameRoomIdList))
    .map((gameRooms) => ({redisClient, gameRooms, onlineNum: 0}));
}
