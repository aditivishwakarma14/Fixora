import axios from "axios";
import { config } from "../config/config.js";
import { AppError } from "../utils/AppError.js";

/**
 * Calls the mail-service to send an HTML email.
 * The real reason is logged here, the user only gets a clear message.
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
        const reason = error.response?.data?.message || error.code || error.message
        console.log(`Mail service call failed (${error.response?.status || "no response"}): ${reason}`)

        throw new AppError("We could not send the email right now. Please try again in a moment.", 502)
    }
}
