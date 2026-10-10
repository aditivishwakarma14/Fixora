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

export const validateSendMail = [
    body("email")
        .isEmail().withMessage("A valid recipient email is required"),
    body("subject")
        .notEmpty().withMessage("Subject is required"),
    body("body")
        .notEmpty().withMessage("Body is required"),
    body("from")
        .notEmpty().withMessage("From is required"),
    validateRequest
]
