import proxy from "express-http-proxy";

/**
 * Create a proxy to a downstream service.
 * prefix is removed from the forwarded path (/api/auth/login -> /login),
 * the verified user (if any) is sent in the `x-user` header and the real
 * client ip is sent in `x-forwarded-for` (used by the rate limiter).
 */
export function createProxy(target, prefix, serviceName) {
    return proxy(target, {
        proxyReqPathResolver: (req) => req.originalUrl.replace(prefix, ""),

        proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
            proxyReqOpts.headers[ "x-forwarded-for" ] = srcReq.ip

            if (srcReq.user) {
                proxyReqOpts.headers[ "x-user" ] = JSON.stringify(srcReq.user)
            }
            return proxyReqOpts
        },

        proxyErrorHandler: (err, res) => {
            console.log(`Proxy error (${serviceName}):`, err.message)
            res.status(503).json({ message: `${serviceName} is unavailable right now`, success: false })
        }
    })
}
