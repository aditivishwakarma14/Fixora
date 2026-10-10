import { transporter } from "../config/mail.js";
import { config } from "../config/config.js";

export async function sendMail({ email, subject, body, from }) {
    return await transporter.sendMail({
        from: `"${from}" <${config.MAIL_USER}>`,
        to: email,
        subject,
        html: body
    })
}
