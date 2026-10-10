import dotenv from "dotenv"
dotenv.config()


const required = [ "MONGO_URI", "MAIL_SERVICE_URL", "INTERNAL_API_KEY" ]

required.forEach((key) => {
    if (!process.env[ key ]) {
        throw new Error(`${key} is not defined in environment variables`)
    }
})

export const config = {
    PORT: process.env.PORT || 3002,
    NODE_ENV: process.env.NODE_ENV || "development",
    MONGO_URI: process.env.MONGO_URI,
    GATEWAY_KEY: process.env.GATEWAY_KEY || "",
    MAIL_SERVICE_URL: process.env.MAIL_SERVICE_URL,
    INTERNAL_API_KEY: process.env.INTERNAL_API_KEY
}