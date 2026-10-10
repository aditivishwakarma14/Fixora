import { redis } from "../config/redis.js";

/**
 * Simple Redis counter per IP.
 * Example: rateLimit("login", 10, 60) -> 10 requests per 60 seconds
 */
export const rateLimit = (name, limit, windowSeconds) => async (req, res, next) => {
    try {
        const key = `rate:${name}:${req.ip}`
        const count = await redis.incr(key)

        if (count === 1) {
            await redis.expire(key, windowSeconds)
        }

        if (count > limit) {
            return res.status(429).json({ message: "Too many requests, please try again later", success: false })
        }
    } catch (error) {
        console.log("Rate limit skipped:", error.message)
    }

    next()
}
