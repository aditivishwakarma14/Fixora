import { Router } from "express";
import { bookingServiceProxy } from "../controllers/gateway.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const router = Router();

// every booking route needs a logged in user (token is verified here)
router.use("/", authenticateUser, bookingServiceProxy)

export default router;
