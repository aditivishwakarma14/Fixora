import { sendMail } from "../services/mail.service.js";

export const sendMailController = async (req, res) => {
    const { email, subject, body, from } = req.body

    await sendMail({ email, subject, body, from })

    res.status(200).json({ message: "Mail sent successfully", success: true })
}
