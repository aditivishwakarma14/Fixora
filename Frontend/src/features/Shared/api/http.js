import axios from "axios";

/**
 * One axios instance for every api call (through the vite proxy / api-gateway).
 * When the access token (15 min) expires, the refresh token is used once
 * and the failed request is retried.
 */
const http = axios.create({
    baseURL: "/api",
    withCredentials: true,
})

let refreshPromise = null

const NO_REFRESH_PATHS = [ "/auth/login", "/auth/signUp", "/auth/refresh-token", "/auth/logout" ]

http.interceptors.response.use(
    (response) => response,
    async (error) => {
        const original = error.config

        const skip = NO_REFRESH_PATHS.includes(original?.url)

        if (error.response?.status !== 401 || original?._retry || skip) {
            return Promise.reject(error)
        }

        original._retry = true

        try {
            refreshPromise = refreshPromise || http.post("/auth/refresh-token")
            await refreshPromise
            return http(original)
        } catch {
            // the session is really over, the app listens and logs the user out
            window.dispatchEvent(new Event("auth:expired"))
            return Promise.reject(error)
        } finally {
            refreshPromise = null
        }
    }
)

export default http
