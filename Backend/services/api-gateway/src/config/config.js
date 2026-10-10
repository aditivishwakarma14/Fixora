import dotenv from "dotenv"
dotenv.config()


if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error("ACCESS_TOKEN_SECRET is not defined in environment variables")
}

export const config = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || "development",
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
    AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL || "http://localhost:3001",
    BOOKING_SERVICE_URL: process.env.BOOKING_SERVICE_URL || "http://localhost:3002",
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET
}
