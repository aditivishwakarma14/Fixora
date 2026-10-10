import crypto from "node:crypto";
import { redis } from "../config/redis.js";
import { AppError } from "../utils/AppError.js";
import { hashToken } from "../utils/token.js";
import {
    findUserByEmail,
    findUserByIdWithPassword,
    findUserByResetToken,
    saveResetToken
} from "../dao/user.dao.js";
import { sendOtp, verifyOtp } from "./otp.service.js";
import { sendMail } from "./mail.service.js";
import { passwordResetTemplate } from "../utils/passwordReset.template.js";
import { passwordUpdateTemplate } from "../utils/passwordUpdate.template.js";

const RESET_TOKEN_MINUTES = 10


export async function forgotPasswordService(email) {
    const user = await findUserByEmail(email)

    if (!user) {
        throw new AppError("Email not registered", 404)
    }

    await sendOtp("forgot_password_otp", email)
}

export async function verifyForgotPasswordOtpService({ email, otp }) {
    await verifyOtp("forgot_password_otp", email, otp)

    const resetToken = crypto.randomBytes(32).toString("hex")
    const expiry = new Date(Date.now() + RESET_TOKEN_MINUTES * 60 * 1000)

    const user = await saveResetToken(email, hashToken(resetToken), expiry)

    if (!user) {
        throw new AppError("Email not registered", 404)
    }

    return { resetToken }
}

export async function resetPasswordService({ token, password }) {
    const user = await findUserByResetToken(hashToken(token))

    if (!user) {
        throw new AppError("Session expired", 400)
    }

    user.password = password // hashed by the pre-save hook
    user.resetToken = undefined
    user.resetTokenExpiry = undefined
    await user.save()

    // log the user out everywhere after a reset
    await redis.del(`session:${user._id}`)

    await sendMail({
        to: user.email,
        subject: "Password Reset Successfully – Fixora Account Secured",
        html: passwordResetTemplate(user.fullName, user.email)
    })
}

export async function updatePasswordService({ userId, password, oldPassword }) {
    const user = await findUserByIdWithPassword(userId)

    if (!user) {
        throw new AppError("User not found", 404)
    }

    const isMatch = await user.comparePassword(oldPassword)

    if (!isMatch) {
        throw new AppError("Old password not matched", 422)
    }

    user.password = password
    await user.save()

    await sendMail({
        to: user.email,
        subject: "Password Updated Successfully – Fixora Account Secured",
        html: passwordUpdateTemplate(user.fullName, user.email)
    })
}
