import { createServer } from "socket";
import { createRedisClient } from "store";
import { setupUserConnection } from "user/connection";

const io = createServer();
const redis = createRedisClient();

setupUserConnection(io, redis);
