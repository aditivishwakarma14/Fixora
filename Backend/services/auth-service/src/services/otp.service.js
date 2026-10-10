import otpGenerator from "otp-generator";
import { redis } from "../config/redis.js";
import { AppError } from "../utils/AppError.js";
import { otpTemplate } from "../utils/otp.template.js";
import { sendMail } from "./mail.service.js";

const OTP_EXPIRY_SECONDS = 300
const MAX_WRONG_ATTEMPTS = 5

/**
 * Generate an OTP, keep it in Redis for 5 minutes and email it.
 * prefix: "signup_otp" | "forgot_password_otp"
 */
export async function sendOtp(prefix, email) {
    const otp = otpGenerator.generate(4, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false
    })

    await redis.set(`${prefix}:${email}`, otp, "EX", OTP_EXPIRY_SECONDS)
    await redis.del(`${prefix}_attempts:${email}`)

    await sendMail({
        to: email,
        subject: "For OTP verification",
        html: otpTemplate(otp)
    })
}

export async function verifyOtp(prefix, email, otp) {
    const latestOtp = await redis.get(`${prefix}:${email}`)

    if (!latestOtp) {
        throw new AppError("Otp not found or expired", 404)
    }

    if (latestOtp !== String(otp)) {
        // a 4 digit otp can be guessed, so only a few wrong tries are allowed
        const attemptsKey = `${prefix}_attempts:${email}`
        const attempts = await redis.incr(attemptsKey)
        await redis.expire(attemptsKey, OTP_EXPIRY_SECONDS)

        if (attempts >= MAX_WRONG_ATTEMPTS) {
            await redis.del(`${prefix}:${email}`, attemptsKey)
            throw new AppError("Too many wrong attempts. Please request a new OTP.", 429)
        }

        throw new AppError("Otp not matched", 422)
    }

    await redis.del(`${prefix}:${email}`, `${prefix}_attempts:${email}`)
}
