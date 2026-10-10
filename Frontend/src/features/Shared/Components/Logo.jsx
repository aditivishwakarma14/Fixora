import { Link } from "react-router";

const Logo = ({ className = "text-2xl" }) => (
    <Link to="/" className={`font-display font-semibold tracking-tight ${className}`} aria-label="Fixora home">
        Fixor<span className="text-brand">A</span>
    </Link>
)

export default Logo
