import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useAuth } from "../../auth/hook/useAuth";
import { getErrorMessage } from "../../Shared/utils/getErrorMessage";
import { passwordProblem } from "../../Shared/utils/validators";
import PageShell from "../../Shared/Components/PageShell";
import { Input } from "../../Shared/Components/Input";
import Button from "../../Shared/Components/Button";

const Card = ({ title, text, children }) => (
    <section className="rounded-2xl border border-line bg-panel p-6">
        <h2 className="font-display text-xl font-semibold">{title}</h2>
        {text && <p className="mt-1 text-sm text-gray-400">{text}</p>}
        <div className="mt-6">{children}</div>
    </section>
)

const ProfileForm = () => {
    const { handleUpdateProfile } = useAuth()
    const user = useSelector((state) => state.auth.user)
    const [ fullName, setFullName ] = useState(user.fullName)
    const [ error, setError ] = useState("")
    const [ loading, setLoading ] = useState(false)

    const submit = async (e) => {
        e.preventDefault()

        if (fullName.trim().length < 2) {
            setError("Enter your full name")
            return
        }

        setLoading(true)
        try {
            const data = await handleUpdateProfile({ fullName: fullName.trim() })
            toast.success(data.message)
        } catch (err) {
            toast.error(getErrorMessage(err))
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={submit} noValidate className="flex flex-col gap-5">
            <Input label="Full name" value={fullName} autoComplete="name" onChange={(e) => { setFullName(e.target.value); setError("") }} error={error} />
            <Input label="Email" value={user.email} disabled hint="Your email cannot be changed" readOnly />
            <Input label="Account type" value={user.role === "Worker" ? "Worker" : "User"} disabled readOnly />
            <div><Button type="submit" loading={loading} disabled={fullName.trim() === user.fullName}>Save changes</Button></div>
        </form>
    )
}

const PasswordForm = () => {
    const { handleUpdatePassword } = useAuth()
    const [ form, setForm ] = useState({ oldPassword: "", password: "", confirmPassword: "" })
    const [ errors, setErrors ] = useState({})
    const [ loading, setLoading ] = useState(false)

    const onChange = (e) => {
        setForm((prev) => ({ ...prev, [ e.target.name ]: e.target.value }))
        setErrors((prev) => ({ ...prev, [ e.target.name ]: "" }))
    }

    const submit = async (e) => {
        e.preventDefault()

        const next = {}
        if (!form.oldPassword) next.oldPassword = "Enter your current password"
        const passwordError = passwordProblem(form.password)
        if (passwordError) next.password = passwordError
        else if (form.password === form.oldPassword) next.password = "The new password must be different"
        if (form.confirmPassword !== form.password) next.confirmPassword = "Passwords do not match"
        setErrors(next)
        if (Object.keys(next).length) return

        setLoading(true)
        try {
            const data = await handleUpdatePassword(form)
            toast.success(data.message)
            setForm({ oldPassword: "", password: "", confirmPassword: "" })
        } catch (err) {
            toast.error(getErrorMessage(err))
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={submit} noValidate className="flex flex-col gap-5">
            <Input label="Current password" name="oldPassword" type="password" autoComplete="current-password" value={form.oldPassword} onChange={onChange} error={errors.oldPassword} />
            <Input label="New password" name="password" type="password" autoComplete="new-password" placeholder="At least 8 characters" value={form.password} onChange={onChange} error={errors.password} />
            <Input label="Confirm new password" name="confirmPassword" type="password" autoComplete="new-password" value={form.confirmPassword} onChange={onChange} error={errors.confirmPassword} />
            <div><Button type="submit" loading={loading}>Update password</Button></div>
        </form>
    )
}

const Account = () => {
    const { handleLogout } = useAuth()
    const navigate = useNavigate()

    const logout = async () => {
        await handleLogout()
        toast.success("Logged out")
        navigate("/login")
    }

    return (
        <PageShell
            title="Account"
            subtitle="Your profile and password."
            action={<Button variant="secondary" onClick={logout}>Log out</Button>}
        >
            <div className="grid gap-6 lg:grid-cols-2">
                <Card title="Profile" text="This is how you appear to others."><ProfileForm /></Card>
                <Card title="Change password" text="You will get an email when it changes."><PasswordForm /></Card>
            </div>
        </PageShell>
    )
}

export default Account
