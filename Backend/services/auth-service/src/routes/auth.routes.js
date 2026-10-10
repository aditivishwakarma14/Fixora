import { Router } from "express";
import {
    validateForgotPassword,
    validateForgotPasswordVerifyOtp,
    validateLogin,
    validateResetPassword,
    validateSendSignupOtp,
    validateSignUp,
    validateUpdatePassword,
    validateUpdateProfile
} from "../validator/auth.validator.js";
import {
    forgotPassword,
    forgotPasswordVerifyOtp,
    getMe,
    login,
    logout,
    refreshToken,
    resetPassword,
    sendSignupOtp,
    signUp,
    updatePassword,
    updateProfile
} from "../controllers/auth.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { rateLimit } from "../middlewares/rateLimit.middleware.js";

const router = Router();


// signup
router.post("/send-mail-auth", rateLimit("otp", 5, 60), validateSendSignupOtp, sendSignupOtp)

router.post("/signUp", rateLimit("signup", 10, 60), validateSignUp, signUp)


// session
router.post("/login", rateLimit("login", 10, 60), validateLogin, login)

router.post("/refresh-token", refreshToken)

router.post("/logout", logout)

/**
 * @route GET /api/auth/me
 * @description Get the authenticated user's profile
 * @access Private
 */
router.get("/me", authenticateUser, getMe)

/**
 * @route PUT /api/auth/me
 * @description Update the authenticated user's profile (full name)
 * @access Private
 */
router.put("/me", authenticateUser, validateUpdateProfile, updateProfile)


// password
router.post("/forgot-password", rateLimit("otp", 5, 60), validateForgotPassword, forgotPassword)

router.put("/forgot-password-verify-otp", rateLimit("verify", 10, 60), validateForgotPasswordVerifyOtp, forgotPasswordVerifyOtp)

router.put("/reset-password", rateLimit("reset", 10, 60), validateResetPassword, resetPassword)

router.put("/update-password", authenticateUser, validateUpdatePassword, updatePassword)

export default router;
