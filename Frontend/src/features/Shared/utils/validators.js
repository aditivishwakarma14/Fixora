export const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())

// returns an error text or "" when the password is fine
export const passwordProblem = (value) => {
    if (value.length < 8) return "Password must be at least 8 characters"
    return ""
}
