import * as Rx from "rxjs/Rx";
import * as redis from "redis";

type Client = redis.RedisClient;
type Observable<T> = Rx.Observable<T>;

export function createRedisClient(): Client {
  return redis.createClient();
}

export function get$(client: Client, key: string): Observable<string | null> {
  const getAsObservable = Rx.Observable.bindNodeCallback(client.get);

  return getAsObservable(key);
}

export function set$(client: Client, key: string, value: string): Observable<"ok"> {
  const setAsObservable = Rx.Observable.bindCallback((
    key: string,
    value: string,
    callback: () => void,
  ) => {
    client.set(key, value, callback);
  });

  return setAsObservable(key, value);
}

export function smembers$(client: Client, key: string): Observable<string[]> {
  const smembersAsObservable = Rx.Observable.bindNodeCallback(client.smembers);

  return smembersAsObservable(key);
}
