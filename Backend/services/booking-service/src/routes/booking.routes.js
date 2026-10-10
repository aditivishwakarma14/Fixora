import { Router } from "express";
import {
    acceptBooking,
    cancelBooking,
    completeBooking,
    createBooking,
    getBooking,
    listMyBookings,
    listOpenBookings,
    listServices
} from "../controllers/booking.controller.js";
import {
    validateBookingId,
    validateCreateBooking,
    validateOpenBookings
} from "../validator/booking.validator.js";
import { authenticateUser, requireRole } from "../middlewares/auth.middleware.js";

const router = Router();


/**
 * @route GET /services
 * @description List of services that can be booked
 * @access Public
 */
router.get("/services", listServices)


/**
 * @route POST /bookings
 * @description A user posts a new job request
 * @access Private (User)
 */
router.post("/bookings", authenticateUser, requireRole("User"), validateCreateBooking, createBooking)

/**
 * @route GET /bookings/mine
 * @description User: own requests. Worker: jobs the worker accepted
 * @access Private
 */
router.get("/bookings/mine", authenticateUser, listMyBookings)

/**
 * @route GET /bookings/open?service=plumber
 * @description Jobs waiting for a worker
 * @access Private (Worker)
 */
router.get("/bookings/open", authenticateUser, requireRole("Worker"), validateOpenBookings, listOpenBookings)

router.get("/bookings/:id", authenticateUser, validateBookingId, getBooking)

/**
 * @route PATCH /bookings/:id/accept
 * @access Private (Worker)
 */
router.patch("/bookings/:id/accept", authenticateUser, requireRole("Worker"), validateBookingId, acceptBooking)

/**
 * @route PATCH /bookings/:id/complete
 * @access Private (Worker who accepted the job)
 */
router.patch("/bookings/:id/complete", authenticateUser, requireRole("Worker"), validateBookingId, completeBooking)

/**
 * @route PATCH /bookings/:id/cancel
 * @access Private (User who posted the job)
 */
router.patch("/bookings/:id/cancel", authenticateUser, requireRole("User"), validateBookingId, cancelBooking)

export default router;
