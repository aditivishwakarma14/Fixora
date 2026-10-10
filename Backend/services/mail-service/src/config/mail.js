import nodemailer from "nodemailer";
import { config } from "./config.js";

// only used when Brevo is not configured (local Gmail SMTP)
export const transporter = config.USE_BREVO
    ? null
    : nodemailer.createTransport({
        host: config.MAIL_HOST,
        port: config.MAIL_PORT,
        secure: config.MAIL_PORT === 465,
        auth: {
            user: config.MAIL_USER,
            pass: config.MAIL_PASS
        }
    })