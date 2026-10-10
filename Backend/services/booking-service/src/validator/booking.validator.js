import { body, param, query, validationResult } from "express-validator";
import { serviceSlugs } from "../config/services.catalog.js";


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

const idRule = param("id").isMongoId().withMessage("Invalid booking id")

export const validateCreateBooking = [
    body("service")
        .isIn(serviceSlugs).withMessage("Please choose a valid service"),
    body("title")
        .trim()
        .isLength({ min: 3, max: 80 }).withMessage("Title must be 3 to 80 characters"),
    body("description")
        .trim()
        .isLength({ min: 10, max: 1000 }).withMessage("Describe the problem in 10 to 1000 characters"),
    body("address")
        .trim()
        .isLength({ min: 5, max: 200 }).withMessage("Address must be 5 to 200 characters"),
    body("preferredDate")
        .optional({ values: "falsy" })
        .isISO8601().withMessage("Preferred date is not valid")
        .custom((value) => new Date(value) >= new Date(new Date().toDateString()))
        .withMessage("Preferred date cannot be in the past"),
    validateRequest
]

export const validateOpenBookings = [
    query("service")
        .optional({ values: "falsy" })
        .isIn(serviceSlugs).withMessage("Unknown service"),
    validateRequest
]

export const validateBookingId = [ idRule, validateRequest ]
