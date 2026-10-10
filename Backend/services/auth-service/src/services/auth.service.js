import { redis } from "../config/redis.js";
import { AppError } from "../utils/AppError.js";
import { createUser, findUserByEmail, findUserById, updateUserName } from "../dao/user.dao.js";
import { sendOtp, verifyOtp } from "./otp.service.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/token.js";

const SESSION_SECONDS = 7 * 24 * 60 * 60


async function startSession(user) {
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    await redis.set(`session:${user._id}`, refreshToken, "EX", SESSION_SECONDS)

    return {
        accessToken,
        refreshToken,
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role
        }
    }
}


export async function sendSignupOtpService(email) {
    const existingUser = await findUserByEmail(email)

    if (existingUser) {
        throw new AppError("Email already registered", 409)
    }

    await sendOtp("signup_otp", email)
}

export async function signUpService({ fullName, email, password, role, otp }) {
    const existingUser = await findUserByEmail(email)

    if (existingUser) {
        throw new AppError("Email already registered", 409)
    }

    await verifyOtp("signup_otp", email, otp)

    const user = await createUser({ fullName, email, password, role })

    return await startSession(user)
}

export async function loginService({ email, password }) {
    const user = await findUserByEmail(email)

    if (!user) {
        throw new AppError("Email not registered", 404)
    }

    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
        throw new AppError("Password not matched", 422)
    }

    return await startSession(user)
}

export async function refreshService(refreshToken) {
    let decoded

    try {
        decoded = verifyRefreshToken(refreshToken)
    } catch {
        throw new AppError("Session expired or invalid", 403)
    }

    const storedToken = await redis.get(`session:${decoded.userId}`)

    if (!storedToken || storedToken !== refreshToken) {
        throw new AppError("Session expired or invalid", 403)
    }

    const user = await findUserById(decoded.userId)

    if (!user) {
        throw new AppError("User not found", 404)
    }

    // rotate the refresh token
    return await startSession(user)
}

export async function logoutService(refreshToken) {
    try {
        const decoded = verifyRefreshToken(refreshToken)
        await redis.del(`session:${decoded.userId}`)
    } catch {
        // token already invalid or expired, nothing to clean up
    }
}

export async function getMeService(userId) {
    const user = await findUserById(userId)

    if (!user) {
        throw new AppError("User not found", 404)
    }

    return {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
    }
}

export async function updateProfileService(userId, fullName) {
    const user = await updateUserName(userId, fullName)

    if (!user) {
        throw new AppError("User not found", 404)
    }

    return {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
    }
}
