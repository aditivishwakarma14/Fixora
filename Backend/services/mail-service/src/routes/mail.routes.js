import { Router } from "express";
import { sendMailController } from "../controllers/mail.controller.js";
import { validateSendMail } from "../validator/mail.validator.js";
import { authenticateService } from "../middlewares/internal.middleware.js";

const router = Router();

/**
 * @route POST /api/mail/send
 * @description Send an HTML email
 * @access Internal (other services only)
 */
router.post("/send", authenticateService, validateSendMail, sendMailController)

export default router;
