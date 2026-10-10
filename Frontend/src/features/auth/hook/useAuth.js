import { useDispatch } from "react-redux"
import { setLoading, setUser } from "../state/auth.slice"
import {
    sendSignupOtp,
    register,
    login,
    logout,
    getMe,
    updateProfile,
    forgotPassword,
    forgotPasswordVerifyOtp,
    resetPassword,
    updatePassword
} from "../service/auth.api"


export const useAuth = () => {

    const dispatch = useDispatch()

    async function handleSendSignupOtp({ fullName, email, password, confirmPassword, role = "User" }) {
        return await sendSignupOtp({ fullName, email, password, confirmPassword, role })
    }

    async function handleSignUp({ fullName, email, password, confirmPassword, role = "User", otp }) {
        const data = await register({ fullName, email, password, confirmPassword, role, otp })

        dispatch(setUser(data.user))

        return data
    }

    async function handleLogin({ email, password }) {
        const data = await login({ email, password })

        dispatch(setUser(data.user))

        return data
    }

    async function handleLogout() {
        try {
            await logout()
        } finally {
            dispatch(setUser(null))
        }
    }

    // restore the logged in user (if a valid cookie exists)
    async function handleGetMe() {
        try {
            dispatch(setLoading(true))
            const data = await getMe()
            dispatch(setUser(data.user))
        } catch {
            dispatch(setUser(null))
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleUpdateProfile({ fullName }) {
        const data = await updateProfile({ fullName })

        dispatch(setUser(data.user))

        return data
    }

    async function handleForgotPassword({ email }) {
        return await forgotPassword({ email })
    }

    async function handleForgotPasswordVerifyOtp({ email, otp }) {
        return await forgotPasswordVerifyOtp({ email, otp })
    }

    async function handleResetPassword({ token, password, confirmPassword }) {
        return await resetPassword({ token, password, confirmPassword })
    }

    async function handleUpdatePassword({ oldPassword, password, confirmPassword }) {
        return await updatePassword({ oldPassword, password, confirmPassword })
    }

    return {
        handleSendSignupOtp,
        handleSignUp,
        handleLogin,
        handleLogout,
        handleGetMe,
        handleUpdateProfile,
        handleForgotPassword,
        handleForgotPasswordVerifyOtp,
        handleResetPassword,
        handleUpdatePassword
    }

}
