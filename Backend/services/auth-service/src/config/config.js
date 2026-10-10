import dotenv from "dotenv"
dotenv.config()


const required = [
    "MONGO_URI",
    "ACCESS_TOKEN_SECRET",
    "REFRESH_TOKEN_SECRET",
    "MAIL_SERVICE_URL",
    "INTERNAL_API_KEY",
    "REDIS_HOST",
]

required.forEach((key) => {
    if (!process.env[ key ]) {
        throw new Error(`${key} is not defined in environment variables`)
    }
})

export const config = {
    PORT: process.env.PORT || 3001,
    NODE_ENV: process.env.NODE_ENV || "development",
    MONGO_URI: process.env.MONGO_URI,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    MAIL_SERVICE_URL: process.env.MAIL_SERVICE_URL,
    INTERNAL_API_KEY: process.env.INTERNAL_API_KEY,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT || 6379,
    REDIS_USERNAME: process.env.REDIS_USERNAME || undefined,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD || undefined
}
