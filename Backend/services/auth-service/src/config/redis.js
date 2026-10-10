import Redis from "ioredis";
import { config } from "./config.js";

// REDIS_URL (e.g. Upstash: rediss://default:password@host:6379) wins over host/port
const options = { lazyConnect: true, maxRetriesPerRequest: 3 };

export const redis = config.REDIS_URL
    ? new Redis(config.REDIS_URL, options)
    : new Redis({
        host: config.REDIS_HOST,
        port: config.REDIS_PORT,
        username: config.REDIS_USERNAME,
        password: config.REDIS_PASSWORD,
        ...options
    });

redis.on("error", (err) => {
    console.log("Redis error:", err.message);
});

export const connectRedis = async () => {
    await redis.connect();
    console.log("Redis connected");
};