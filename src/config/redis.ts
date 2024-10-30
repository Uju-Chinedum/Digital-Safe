import dotenv from "dotenv";
import { createClient, RedisClientType } from "redis";

dotenv.config();

const redisClient: RedisClientType<any> = createClient({
  password: process.env.REDIS_PASSWORD!,
  socket: {
    host: process.env.REDIS_HOST!,
    port: parseInt(process.env.REDIS_PORT!),
  },
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));
redisClient.connect();

export default redisClient;
