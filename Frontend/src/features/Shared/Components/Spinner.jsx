const Spinner = ({ size = 20, className = "" }) => (
    <svg
        className={`animate-spin motion-reduce:animate-none ${className}`}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        role="status"
        aria-label="Loading"
    >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
        <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
)

export default Spinner
