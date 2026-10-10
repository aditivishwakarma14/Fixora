import { transporter } from "../config/mail.js";
import { config } from "../config/config.js";
import { AppError } from "../utils/AppError.js";

async function sendWithBrevo({ email, subject, body, from }) {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
            "api-key": config.BREVO_API_KEY,
            "content-type": "application/json",
            accept: "application/json"
        },
        body: JSON.stringify({
            sender: { name: from, email: config.MAIL_USER },
            to: [ { email } ],
            subject,
            htmlContent: body
        }),
        signal: AbortSignal.timeout(15000)
    })

    if (!response.ok) {
        const text = await response.text()
        throw new AppError(`Brevo rejected the email (${response.status}): ${text}`, 502)
    }
}

export async function sendMail({ email, subject, body, from }) {
    if (config.USE_BREVO) {
        return await sendWithBrevo({ email, subject, body, from })
    }

    return await transporter.sendMail({
        from: `"${from}" <${config.MAIL_USER}>`,
        to: email,
        subject,
        html: body
    })
}