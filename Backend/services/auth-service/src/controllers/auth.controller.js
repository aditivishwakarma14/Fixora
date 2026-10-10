import {
    getMeService,
    loginService,
    logoutService,
    refreshService,
    sendSignupOtpService,
    signUpService,
    updateProfileService
} from "../services/auth.service.js";
import {
    forgotPasswordService,
    resetPasswordService,
    updatePasswordService,
    verifyForgotPasswordOtpService
} from "../services/password.service.js";
import { AppError } from "../utils/AppError.js";
import { clearAuthCookies, setAuthCookies } from "../utils/cookie.js";


export const sendSignupOtp = async (req, res) => {
    await sendSignupOtpService(req.body.email)

    res.status(201).json({ message: "Otp send successfully", success: true })
}

export const signUp = async (req, res) => {
    const { fullName, email, password, role, otp } = req.body

    const { user, accessToken, refreshToken } = await signUpService({ fullName, email, password, role, otp })

    setAuthCookies(res, { accessToken, refreshToken })

    res.status(201).json({ message: "Signup successfully", success: true, user })
}

export const login = async (req, res) => {
    const { email, password } = req.body

    const { user, accessToken, refreshToken } = await loginService({ email, password })

    setAuthCookies(res, { accessToken, refreshToken })

    res.status(200).json({ message: "Login successfully", success: true, user })
}

export const refreshToken = async (req, res) => {
    const token = req.cookies.refreshToken

    if (!token) {
        throw new AppError("Refresh token missing", 401)
    }

    const { user, accessToken, refreshToken } = await refreshService(token)

    setAuthCookies(res, { accessToken, refreshToken })

    res.status(200).json({ message: "Token refreshed successfully", success: true, user })
}

export const logout = async (req, res) => {
    const token = req.cookies.refreshToken

    if (token) {
        await logoutService(token)
    }

    clearAuthCookies(res)

    res.status(200).json({ message: "Logout successfully", success: true })
}

/**
 * @route GET /me
 * @description Get the authenticated user's profile
 * @access Private
 */
export const getMe = async (req, res) => {
    const user = await getMeService(req.user.userId)

    res.status(200).json({ message: "User fetched successfully", success: true, user })
}

export const forgotPassword = async (req, res) => {
    await forgotPasswordService(req.body.email)

    res.status(201).json({ message: "Otp send successfully for forgot password", success: true })
}

export const forgotPasswordVerifyOtp = async (req, res) => {
    const { email, otp } = req.body

    const data = await verifyForgotPasswordOtpService({ email, otp })

    res.status(200).json({ message: "Otp verified successfully", success: true, ...data })
}

export const resetPassword = async (req, res) => {
    const { token, password } = req.body

    await resetPasswordService({ token, password })

    res.status(200).json({ message: "Password reset successfully", success: true })
}

export const updatePassword = async (req, res) => {
    const { password, oldPassword } = req.body

    await updatePasswordService({ userId: req.user.userId, password, oldPassword })

    res.status(200).json({ message: "Password updated successfully", success: true })
}

export const updateProfile = async (req, res) => {
    const user = await updateProfileService(req.user.userId, req.body.fullName)

    res.status(200).json({ message: "Profile updated successfully", success: true, user })
}
