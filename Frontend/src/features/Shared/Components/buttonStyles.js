const base = "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition focus-visible:outline-2 disabled:cursor-not-allowed disabled:opacity-60"

const variants = {
    primary: "bg-brand text-black hover:bg-yellow-300",
    secondary: "border border-line text-gray-100 hover:border-gray-500 hover:bg-white/5",
    ghost: "text-gray-300 hover:bg-white/5 hover:text-white",
    danger: "border border-red-500/40 text-red-300 hover:bg-red-500/10",
}

const sizes = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-6 py-2.5 text-sm sm:text-base",
    lg: "px-7 py-3 text-base",
}

// also used on <Link> so links and buttons look the same
export const buttonStyles = (variant = "primary", size = "md", extra = "") =>
    `${base} ${variants[ variant ]} ${sizes[ size ]} ${extra}`
