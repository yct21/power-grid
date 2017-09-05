import * as Rx from "rxjs/Rx";
import { RedisClient } from "redis";
import * as redis from "utils/redis";

type Observable<T> = Rx.Observable<T>;

export interface User {
  // Unique userId, generated in frontend since we don't care
  id: string,

  // User name, input by user
  name: string,

  // Current name space of socket
  nameSpace: string,

  // Current socket of user, supposed to change in every connections
  socketId: string,
}

export function get$(redisClient: RedisClient, id: string): Observable<User | null> {
  return redis.get$(redisClient, `user:${id}`)
    .map((result: string | null) => {
      if (result) {
        const user: any = JSON.parse(result);

        if (user && user.name && user.nameSpace && user.socketId) {
          const { name, nameSpace, socketId } = user;
          return { id, name, nameSpace, socketId };
        }
      } else {
        return null;
      }
    })
}
