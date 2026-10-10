import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useAuth } from "../hook/useAuth";
import { getErrorMessage } from "../../Shared/utils/getErrorMessage";
import { passwordProblem } from "../../Shared/utils/validators";
import AuthLayout from "../components/AuthLayout";
import { Input } from "../../Shared/Components/Input";
import Button from "../../Shared/Components/Button";

const ResetPassword = () => {
    const { handleResetPassword } = useAuth()
    const { state } = useLocation()
    const navigate = useNavigate()
    const [ form, setForm ] = useState({ password: "", confirmPassword: "" })
    const [ errors, setErrors ] = useState({})
    const [ loading, setLoading ] = useState(false)

    if (!state?.token) {
        return <Navigate to="/forgot-password" replace />
    }

    const onChange = (e) => {
        setForm((prev) => ({ ...prev, [ e.target.name ]: e.target.value }))
        setErrors((prev) => ({ ...prev, [ e.target.name ]: "" }))
    }

    const submit = async (e) => {
        e.preventDefault()

        const next = {}
        const passwordError = passwordProblem(form.password)
        if (passwordError) next.password = passwordError
        if (form.confirmPassword !== form.password) next.confirmPassword = "Passwords do not match"
        setErrors(next)
        if (Object.keys(next).length) return

        setLoading(true)
        try {
            const data = await handleResetPassword({ token: state.token, ...form })
            toast.success(data.message)
            navigate("/login", { replace: true })
        } catch (error) {
            toast.error(getErrorMessage(error))
            setLoading(false)
        }
    }

    return (
        <AuthLayout title="Set a new password" subtitle="Choose a password you have not used before.">
            <form onSubmit={submit} noValidate className="flex flex-col gap-5">
                <Input label="New password" name="password" type="password" autoComplete="new-password" placeholder="At least 8 characters" value={form.password} onChange={onChange} error={errors.password} />
                <Input label="Confirm new password" name="confirmPassword" type="password" autoComplete="new-password" placeholder="Type it again" value={form.confirmPassword} onChange={onChange} error={errors.confirmPassword} />
                <Button type="submit" size="lg" loading={loading}>Reset password</Button>
            </form>
        </AuthLayout>
    )
}

export default ResetPassword
