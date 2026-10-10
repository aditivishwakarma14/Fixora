import { config } from "../config/config.js";

const isProduction = config.NODE_ENV === "production";

const baseOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax"
}

export function setAuthCookies(res, { accessToken, refreshToken }) {
    res.cookie("accessToken", accessToken, { ...baseOptions, maxAge: 15 * 60 * 1000 })
    res.cookie("refreshToken", refreshToken, { ...baseOptions, maxAge: 7 * 24 * 60 * 60 * 1000 })
}

export function clearAuthCookies(res) {
    res.clearCookie("accessToken", baseOptions)
    res.clearCookie("refreshToken", baseOptions)
}
