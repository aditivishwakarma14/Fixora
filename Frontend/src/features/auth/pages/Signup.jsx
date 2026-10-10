import { Link } from "react-router";
import AuthLayout from "../components/AuthLayout";
import SignupForm from "../components/SignupForm";

const Signup = () => (
    <AuthLayout
        title="Create your account"
        subtitle="It takes less than a minute."
        footer={<>Already have an account? <Link to="/login" className="font-semibold text-brand hover:underline">Log in</Link></>}
    >
        <SignupForm />
    </AuthLayout>
)

export default Signup
