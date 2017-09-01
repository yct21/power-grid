import * as Rx from "rxjs/Rx";
import * as redis from "redis";

export function createRedisClient(): redis.RedisClient {
  return redis.createClient();
}

export function get$(client: redis.RedisClient, key: string): Rx.Observable<string | null> {
  const getAsObservable = Rx.Observable.bindCallback(client.get, (err, result) => result);

  return getAsObservable(key);
}

export function set$(
  client: redis.RedisClient,
  key: string,
  value: string,
): Rx.Observable<"ok"> {
  const setAsObservable = Rx.Observable.bindCallback((
    key: string,
    value: string,
    callback: () => void
  ) => {
    client.set(key, value, callback);
  });

  return setAsObservable(key, value);
}
