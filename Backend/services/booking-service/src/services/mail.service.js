import axios from "axios";
import { config } from "../config/config.js";

/**
 * Best effort email through the mail-service.
 * A failed email must never fail a booking action, so errors are only logged.
 */
export async function sendMail({ to, subject, html }) {
    try {
        await axios.post(`${config.MAIL_SERVICE_URL}/api/mail/send`, {
            email: to,
            subject,
            body: html,
            from: "Fixora"
        }, {
            headers: { "x-internal-key": config.INTERNAL_API_KEY },
            timeout: 15000
        })
    } catch (error) {
        console.log("Booking email not sent:", error.response?.data?.message || error.code || error.message)
    }
}
