export const formatDate = (value) => {
    if (!value) return ""
    return new Date(value).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
}

export const timeAgo = (value) => {
    if (!value) return ""
    const seconds = Math.max(1, Math.floor((Date.now() - new Date(value).getTime()) / 1000))

    const units = [
        [ 31536000, "year" ],
        [ 2592000, "month" ],
        [ 86400, "day" ],
        [ 3600, "hour" ],
        [ 60, "minute" ]
    ]

    for (const [ size, label ] of units) {
        if (seconds >= size) {
            const count = Math.floor(seconds / size)
            return `${count} ${label}${count > 1 ? "s" : ""} ago`
        }
    }
    return "just now"
}

// value for <input type="date" min="...">
export const todayInputValue = () => new Date().toISOString().slice(0, 10)
