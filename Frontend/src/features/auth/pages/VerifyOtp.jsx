import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useAuth } from "../hook/useAuth";
import { getErrorMessage } from "../../Shared/utils/getErrorMessage";
import AuthLayout from "../components/AuthLayout";
import OtpField from "../components/OtpField";
import Button from "../../Shared/Components/Button";

const RESEND_SECONDS = 30

const VerifyOtp = () => {
    const { handleSendSignupOtp, handleSignUp } = useAuth()
    const { state: signupData } = useLocation()
    const navigate = useNavigate()
    const [ otp, setOtp ] = useState("")
    const [ loading, setLoading ] = useState(false)
    const [ cooldown, setCooldown ] = useState(RESEND_SECONDS)

    useEffect(() => {
        if (cooldown <= 0) return
        const timer = setTimeout(() => setCooldown((c) => c - 1), 1000)
        return () => clearTimeout(timer)
    }, [ cooldown ])

    // opened directly without filling the signup form
    if (!signupData?.email) {
        return <Navigate to="/signup" replace />
    }

    const verify = async (e) => {
        e.preventDefault()

        if (otp.length < 4) {
            toast.error("Enter the 4 digit code")
            return
        }

        setLoading(true)
        try {
            const data = await handleSignUp({ ...signupData, otp })
            toast.success(data.message)
            navigate("/dashboard", { replace: true })
        } catch (error) {
            toast.error(getErrorMessage(error))
            setLoading(false)
        }
    }

    const resend = async () => {
        const toastId = toast.loading("Sending a new code...")
        try {
            const data = await handleSendSignupOtp(signupData)
            toast.success(data.message, { id: toastId })
            setOtp("")
            setCooldown(RESEND_SECONDS)
        } catch (error) {
            toast.error(getErrorMessage(error), { id: toastId })
        }
    }

    return (
        <AuthLayout
            title="Check your email"
            subtitle={<>We sent a 4 digit code to <span className="break-all text-white">{signupData.email}</span>. It expires in 5 minutes.</>}
            footer={<button type="button" onClick={() => navigate("/signup")} className="cursor-pointer text-brand hover:underline">Use a different email</button>}
        >
            <form onSubmit={verify} className="flex flex-col gap-6">
                <OtpField value={otp} onChange={setOtp} />

                <Button type="submit" size="lg" loading={loading}>Verify and create account</Button>

                <p className="text-center text-sm text-gray-400">
                    Did not get it?{" "}
                    {cooldown > 0
                        ? <span>Resend in {cooldown}s</span>
                        : <button type="button" onClick={resend} className="cursor-pointer font-semibold text-brand hover:underline">Send a new code</button>}
                </p>
            </form>
        </AuthLayout>
    )
}

export default VerifyOtp
