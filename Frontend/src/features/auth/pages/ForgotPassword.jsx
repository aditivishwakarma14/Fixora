import { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useAuth } from "../hook/useAuth";
import { getErrorMessage } from "../../Shared/utils/getErrorMessage";
import { isEmail } from "../../Shared/utils/validators";
import AuthLayout from "../components/AuthLayout";
import { Input } from "../../Shared/Components/Input";
import Button from "../../Shared/Components/Button";

const ForgotPassword = () => {
    const { handleForgotPassword } = useAuth()
    const navigate = useNavigate()
    const [ email, setEmail ] = useState("")
    const [ error, setError ] = useState("")
    const [ loading, setLoading ] = useState(false)

    const submit = async (e) => {
        e.preventDefault()

        if (!isEmail(email)) {
            setError("Enter a valid email address")
            return
        }

        setLoading(true)
        try {
            const data = await handleForgotPassword({ email: email.trim() })
            toast.success(data.message)
            navigate("/forgot-password-otp-verify", { state: { email: email.trim() } })
        } catch (err) {
            toast.error(getErrorMessage(err))
            setLoading(false)
        }
    }

    return (
        <AuthLayout
            title="Forgot your password?"
            subtitle="Enter your email and we will send you a code to reset it."
            footer={<Link to="/login" className="font-semibold text-brand hover:underline">Back to log in</Link>}
        >
            <form onSubmit={submit} noValidate className="flex flex-col gap-5">
                <Input
                    label="Email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError("") }}
                    error={error}
                />
                <Button type="submit" size="lg" loading={loading}>Send code</Button>
            </form>
        </AuthLayout>
    )
}

export default ForgotPassword
