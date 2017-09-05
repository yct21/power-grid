// import { RedisClient } from "redis";

export interface GameRoom {
  id: string,
}

// TODO
export function parseRoom(str: string): GameRoom {
  return JSON.parse(str);
}
