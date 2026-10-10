const styles = {
    requested: "bg-yellow-400/10 text-yellow-300 ring-yellow-400/30",
    accepted: "bg-sky-400/10 text-sky-300 ring-sky-400/30",
    completed: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/30",
    cancelled: "bg-gray-400/10 text-gray-400 ring-gray-400/30",
}

const labels = {
    requested: "Waiting",
    accepted: "Accepted",
    completed: "Completed",
    cancelled: "Cancelled",
}

const StatusBadge = ({ status }) => (
    <span className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${styles[ status ]}`}>
        {labels[ status ] || status}
    </span>
)

export default StatusBadge
