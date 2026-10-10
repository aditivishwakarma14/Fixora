import jwt from "jsonwebtoken";
import { config } from "../config/config.js";


/**
 * Verifies the access token (cookie or Bearer header) and keeps the
 * decoded user on req.user so it can be forwarded to the services.
 */
export const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[ 1 ]
        : req.cookies.accessToken

    if (!token) {
        return res.status(401).json({ message: "Unauthorized", success: false })
    }

    try {
        req.user = jwt.verify(token, config.ACCESS_TOKEN_SECRET)
        next()
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized", success: false })
    }
}


/**
 * Never trust an `x-user` header sent by a client,
 * only the gateway is allowed to set it.
 */
export const removeUserHeader = (req, res, next) => {
    delete req.headers[ "x-user" ]
    next()
}
