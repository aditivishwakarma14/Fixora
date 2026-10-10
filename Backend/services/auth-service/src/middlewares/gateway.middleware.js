import { config } from "../config/config.js";

/**
 * Only the api-gateway may call this service.
 * The gateway sends its secret in the `x-gateway-key` header.
 * When GATEWAY_KEY is not set (local development) the check is skipped.
 */
export const requireGateway = (req, res, next) => {
    if (!config.GATEWAY_KEY || req.path === "/health") return next()

    if (req.headers[ "x-gateway-key" ] !== config.GATEWAY_KEY) {
        return res.status(403).json({ message: "Forbidden", success: false })
    }

    next()
}