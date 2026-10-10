import { Link } from "react-router";
import { buttonStyles } from "../Components/buttonStyles";

const NotFound = () => (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-xl flex-col items-center justify-center px-6 text-center">
        <p className="font-display text-7xl font-semibold text-brand">404</p>
        <h1 className="mt-4 font-display text-2xl font-semibold">This page does not exist</h1>
        <p className="mt-2 text-gray-400">The link may be broken or the page may have moved.</p>
        <Link to="/" className={buttonStyles("primary", "md", "mt-8")}>Back to home</Link>
    </main>
)

export default NotFound
