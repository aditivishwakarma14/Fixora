import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useAuth } from "../hook/useAuth";
import { getErrorMessage } from "../../Shared/utils/getErrorMessage";
import { isEmail } from "../../Shared/utils/validators";
import { Input } from "../../Shared/Components/Input";
import Button from "../../Shared/Components/Button";

const LoginForm = () => {
    const { handleLogin } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [ form, setForm ] = useState({ email: "", password: "" })
    const [ errors, setErrors ] = useState({})
    const [ loading, setLoading ] = useState(false)

    const onChange = (e) => {
        setForm((prev) => ({ ...prev, [ e.target.name ]: e.target.value }))
        setErrors((prev) => ({ ...prev, [ e.target.name ]: "" }))
    }

    const submit = async (e) => {
        e.preventDefault()

        const next = {}
        if (!isEmail(form.email)) next.email = "Enter a valid email address"
        if (!form.password) next.password = "Enter your password"
        setErrors(next)
        if (Object.keys(next).length) return

        setLoading(true)
        try {
            const data = await handleLogin({ email: form.email.trim(), password: form.password })
            toast.success(`Welcome back, ${data.user.fullName.split(" ")[ 0 ]}`)
            navigate(location.state?.from || "/dashboard", { replace: true })
        } catch (error) {
            toast.error(getErrorMessage(error))
            setLoading(false)
        }
    }

    return (
        <form onSubmit={submit} noValidate className="flex flex-col gap-5">
            <Input
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={onChange}
                error={errors.email}
            />

            <div>
                <Input
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Your password"
                    value={form.password}
                    onChange={onChange}
                    error={errors.password}
                />
                <Link to="/forgot-password" className="mt-2 inline-block text-sm text-brand hover:underline">
                    Forgot password?
                </Link>
            </div>

            <Button type="submit" size="lg" loading={loading}>Log in</Button>
        </form>
    )
}

export default LoginForm
