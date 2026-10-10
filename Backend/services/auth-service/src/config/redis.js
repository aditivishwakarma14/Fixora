import Redis from "ioredis";
import { config } from "./config.js";

export const redis = new Redis({
    host: config.REDIS_HOST,
    port: config.REDIS_PORT,
    username: config.REDIS_USERNAME,
    password: config.REDIS_PASSWORD,
    lazyConnect: true
});

redis.on("error", (err) => {
    console.log("Redis error:", err.message);
});

export const connectRedis = async () => {
    await redis.connect();
    console.log("Redis connected");
};
