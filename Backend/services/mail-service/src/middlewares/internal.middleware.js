import { config } from "../config/config.js";

/**
 * mail-service is internal only.
 * Callers must send the shared key in the `x-internal-key` header.
 */
export const authenticateService = (req, res, next) => {
    if (req.headers[ "x-internal-key" ] !== config.INTERNAL_API_KEY) {
        return res.status(403).json({ message: "Forbidden", success: false })
    }

    next()
}
