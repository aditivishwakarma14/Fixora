import http from "../../Shared/api/http";

export async function sendSignupOtp({ fullName, email, password, confirmPassword, role }) {
    const response = await http.post("/auth/send-mail-auth", { fullName, email, password, confirmPassword, role })
    return response.data
}

export async function register({ fullName, email, password, confirmPassword, role, otp }) {
    const response = await http.post("/auth/signUp", { fullName, email, password, confirmPassword, role, otp })
    return response.data
}

export async function login({ email, password }) {
    const response = await http.post("/auth/login", { email, password })
    return response.data
}

export async function logout() {
    const response = await http.post("/auth/logout")
    return response.data
}

export async function getMe() {
    const response = await http.get("/auth/me")
    return response.data
}

export async function updateProfile({ fullName }) {
    const response = await http.put("/auth/me", { fullName })
    return response.data
}

export async function forgotPassword({ email }) {
    const response = await http.post("/auth/forgot-password", { email })
    return response.data
}

export async function forgotPasswordVerifyOtp({ email, otp }) {
    const response = await http.put("/auth/forgot-password-verify-otp", { email, otp })
    return response.data
}

export async function resetPassword({ token, password, confirmPassword }) {
    const response = await http.put("/auth/reset-password", { token, password, confirmPassword })
    return response.data
}

export async function updatePassword({ oldPassword, password, confirmPassword }) {
    const response = await http.put("/auth/update-password", { oldPassword, password, confirmPassword })
    return response.data
}
