import { body, validationResult } from "express-validator";


function validateRequest(req, res, next) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: errors.array()[ 0 ].msg,
            success: false,
            errors: errors.array()
        });
    }

    next();

}

const emailRule = body("email")
    .isEmail().withMessage("Invalid email format")
    .normalizeEmail({ gmail_remove_dots: false })

const passwordRule = body("password")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")

const confirmPasswordRule = body("confirmPassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Password and confirmPassword not matched")

const otpRule = body("otp")
    .isLength({ min: 4, max: 4 }).withMessage("Otp must be 4 digits")
    .isNumeric().withMessage("Otp must be numeric")


export const validateSendSignupOtp = [
    body("fullName")
        .trim()
        .notEmpty().withMessage("Full name is required"),
    emailRule,
    passwordRule,
    confirmPasswordRule,
    body("role")
        .optional()
        .isIn([ "User", "Worker" ]).withMessage("Role must be User or Worker"),
    validateRequest
]

export const validateSignUp = [
    ...validateSendSignupOtp.slice(0, -1),
    otpRule,
    validateRequest
]

export const validateLogin = [
    emailRule,
    body("password")
        .notEmpty().withMessage("Password is required"),
    validateRequest
]

export const validateForgotPassword = [
    emailRule,
    validateRequest
]

export const validateForgotPasswordVerifyOtp = [
    emailRule,
    otpRule,
    validateRequest
]

export const validateResetPassword = [
    body("token")
        .notEmpty().withMessage("Reset token is missing"),
    passwordRule,
    confirmPasswordRule,
    validateRequest
]

export const validateUpdateProfile = [
    body("fullName")
        .trim()
        .isLength({ min: 2, max: 60 }).withMessage("Full name must be 2 to 60 characters"),
    validateRequest
]

export const validateUpdatePassword = [
    body("oldPassword")
        .notEmpty().withMessage("Old password is required"),
    passwordRule,
    confirmPasswordRule,
    body("password")
        .custom((value, { req }) => value !== req.body.oldPassword)
        .withMessage("New and old password is same"),
    validateRequest
]
