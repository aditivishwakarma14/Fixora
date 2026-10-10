import { Link } from "react-router";
import AuthLayout from "../components/AuthLayout";
import LoginForm from "../components/LoginForm";

const Login = () => (
    <AuthLayout
        title="Welcome back"
        subtitle="Log in to manage your requests."
        footer={<>New to Fixora? <Link to="/signup" className="font-semibold text-brand hover:underline">Create an account</Link></>}
    >
        <LoginForm />
    </AuthLayout>
)

export default Login
