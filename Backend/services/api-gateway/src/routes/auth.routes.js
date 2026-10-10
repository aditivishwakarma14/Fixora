import { Router } from "express";
import { authServiceProxy } from "../controllers/gateway.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const router = Router();


// private routes (token is verified here)
router.use("/me", authenticateUser, authServiceProxy)

router.use("/update-password", authenticateUser, authServiceProxy)


// public routes
router.use("/", authServiceProxy)

export default router;
