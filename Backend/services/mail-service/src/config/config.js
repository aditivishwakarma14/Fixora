import dotenv from "dotenv"
dotenv.config()

// Two ways to send mail:
//  1. BREVO_API_KEY set  -> Brevo HTTP API (use this on Render, SMTP ports are blocked there)
//  2. otherwise          -> Gmail/SMTP with MAIL_HOST, MAIL_USER, MAIL_PASS (local development)
const useBrevo = Boolean(process.env.BREVO_API_KEY)

const required = [ "INTERNAL_API_KEY", "MAIL_USER", ...(useBrevo ? [] : [ "MAIL_HOST", "MAIL_PASS" ]) ]

required.forEach((key) => {
    if (!process.env[ key ]) {
        throw new Error(`${key} is not defined in environment variables`)
    }
})

export const config = {
    PORT: process.env.PORT || 5000,
    NODE_ENV: process.env.NODE_ENV || "development",
    INTERNAL_API_KEY: process.env.INTERNAL_API_KEY,
    USE_BREVO: useBrevo,
    BREVO_API_KEY: process.env.BREVO_API_KEY || "",
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_PORT: Number(process.env.MAIL_PORT) || 465,
    MAIL_USER: process.env.MAIL_USER,
    MAIL_PASS: process.env.MAIL_PASS
}