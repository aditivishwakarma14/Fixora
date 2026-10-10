import { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useAuth } from "../hook/useAuth";
import { getErrorMessage } from "../../Shared/utils/getErrorMessage";
import { isEmail, passwordProblem } from "../../Shared/utils/validators";
import { Input } from "../../Shared/Components/Input";
import Button from "../../Shared/Components/Button";

const roles = [
    { value: "User", title: "I need a service", text: "Post jobs and get them fixed" },
    { value: "Worker", title: "I provide a service", text: "Accept jobs near you" },
]

const SignupForm = () => {
    const { handleSendSignupOtp } = useAuth()
    const navigate = useNavigate()
    const [ form, setForm ] = useState({ fullName: "", email: "", password: "", confirmPassword: "", role: "User" })
    const [ errors, setErrors ] = useState({})
    const [ loading, setLoading ] = useState(false)

    const onChange = (e) => {
        setForm((prev) => ({ ...prev, [ e.target.name ]: e.target.value }))
        setErrors((prev) => ({ ...prev, [ e.target.name ]: "" }))
    }

    const submit = async (e) => {
        e.preventDefault()

        const next = {}
        if (form.fullName.trim().length < 2) next.fullName = "Enter your full name"
        if (!isEmail(form.email)) next.email = "Enter a valid email address"
        const passwordError = passwordProblem(form.password)
        if (passwordError) next.password = passwordError
        if (form.confirmPassword !== form.password) next.confirmPassword = "Passwords do not match"
        setErrors(next)
        if (Object.keys(next).length) return

        const payload = { ...form, fullName: form.fullName.trim(), email: form.email.trim() }

        setLoading(true)
        try {
            const data = await handleSendSignupOtp(payload)
            toast.success(data.message)
            navigate("/verify-otp", { state: payload })
        } catch (error) {
            toast.error(getErrorMessage(error))
            setLoading(false)
        }
    }

    return (
        <form onSubmit={submit} noValidate className="flex flex-col gap-5">
            <fieldset>
                <legend className="mb-1.5 text-sm font-medium text-gray-200">I want to</legend>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {roles.map((role) => (
                        <label
                            key={role.value}
                            className={`cursor-pointer rounded-xl border p-3 transition has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand ${
                                form.role === role.value ? "border-brand bg-brand/10" : "border-line hover:border-gray-500"
                            }`}
                        >
                            <input
                                type="radio"
                                name="role"
                                value={role.value}
                                checked={form.role === role.value}
                                onChange={onChange}
                                className="sr-only"
                            />
                            <span className="block font-semibold">{role.title}</span>
                            <span className="block text-sm text-gray-400">{role.text}</span>
                        </label>
                    ))}
                </div>
            </fieldset>

            <Input label="Full name" name="fullName" autoComplete="name" placeholder="Your full name" value={form.fullName} onChange={onChange} error={errors.fullName} />
            <Input label="Email" name="email" type="email" autoComplete="email" placeholder="you@example.com" value={form.email} onChange={onChange} error={errors.email} />
            <Input label="Password" name="password" type="password" autoComplete="new-password" placeholder="At least 8 characters" value={form.password} onChange={onChange} error={errors.password} />
            <Input label="Confirm password" name="confirmPassword" type="password" autoComplete="new-password" placeholder="Type the password again" value={form.confirmPassword} onChange={onChange} error={errors.confirmPassword} />

            <Button type="submit" size="lg" loading={loading}>Send OTP</Button>
            <p className="-mt-2 text-center text-xs text-gray-500">We will email a 4 digit code to verify your address.</p>
        </form>
    )
}

export default SignupForm
