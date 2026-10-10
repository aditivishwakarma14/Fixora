import Spinner from "./Spinner";
import { buttonStyles } from "./buttonStyles";

const Button = ({ variant = "primary", size = "md", loading = false, disabled, className = "", children, type = "button", ...props }) => (
    <button
        type={type}
        disabled={disabled || loading}
        className={buttonStyles(variant, size, className)}
        {...props}
    >
        {loading && <Spinner size={16} />}
        {children}
    </button>
)

export default Button
