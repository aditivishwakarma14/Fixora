import { config } from "../config/config.js";
import { createProxy } from "../services/proxy.service.js";

export const healthCheck = (_req, res) => {
    res.status(200).json({ message: "API gateway is running", success: true })
}

// forwards /api/auth/* to the auth-service
export const authServiceProxy = createProxy(config.AUTH_SERVICE_URL, "/api/auth", "Auth service")

// forwards /api/bookings/* and /api/services to the booking-service
export const bookingServiceProxy = createProxy(config.BOOKING_SERVICE_URL, "/api", "Booking service")
