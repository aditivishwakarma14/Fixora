import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import { config } from "../config/config.js";

export function generateAccessToken(user) {
    return jwt.sign({
        userId: user._id,
        email: user.email,
        role: user.role,
        fullName: user.fullName
    }, config.ACCESS_TOKEN_SECRET, { expiresIn: "15m" })
}

export function generateRefreshToken(user) {
    return jwt.sign({ userId: user._id }, config.REFRESH_TOKEN_SECRET, { expiresIn: "7d" })
}

export function verifyRefreshToken(token) {
    return jwt.verify(token, config.REFRESH_TOKEN_SECRET)
}

// reset tokens are stored hashed in the database
export function hashToken(token) {
    return crypto.createHash("sha256").update(token).digest("hex")
}
