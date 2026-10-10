import app from "./src/app.js";
import { config } from "./src/config/config.js";
import { transporter } from "./src/config/mail.js";

const PORT = config.PORT;

app.listen(PORT, () => {
    console.log(`Mail service listening on port ${PORT}`);

    if (config.USE_BREVO) {
        console.log(`Sending mail with the Brevo API as ${config.MAIL_USER}`)
        return
    }

    // tell the developer immediately if the Gmail login is wrong
    transporter.verify()
        .then(() => console.log("SMTP login OK, emails can be sent"))
        .catch((error) => {
            console.log("SMTP login FAILED:", error.message)
            console.log("Check MAIL_USER and MAIL_PASS in .env (Gmail needs an App Password, no spaces)")
        })
});