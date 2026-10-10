/**
 * The api-gateway verifies the JWT and forwards the decoded user
 * in the `x-user` header. This reads it for private routes.
 */
export const authenticateUser = (req, res, next) => {
    const header = req.headers[ "x-user" ]

    if (!header) {
        return res.status(401).json({ message: "Unauthorized", success: false })
    }

    try {
        req.user = JSON.parse(header)
        next()
    } catch {
        return res.status(401).json({ message: "Unauthorized", success: false })
    }
}
