import { createServer } from "utils/socketIO";
import { createRedisClient } from "utils/redis";
import { setupSocketServer } from "socket";

const io = createServer();
const redis = createRedisClient();

setupSocketServer(io, redis);
