import { FaCheck } from "react-icons/fa";

const order = [ "requested", "accepted", "completed" ]
const labels = { requested: "Requested", accepted: "Accepted", completed: "Completed" }

// three small dots that show how far a booking has come
const StatusSteps = ({ status }) => {
    if (status === "cancelled") {
        return <p className="text-sm text-gray-500">This request was cancelled.</p>
    }

    const current = order.indexOf(status)

    return (
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-2" aria-label="Progress">
            {order.map((step, index) => {
                const done = index < current || status === "completed"
                const active = index === current && status !== "completed"

                return (
                    <li key={step} className="flex items-center gap-2">
                        <span
                            className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
                                done ? "bg-brand text-black" : active ? "border-2 border-brand" : "border border-gray-600"
                            }`}
                            aria-hidden="true"
                        >
                            {done && <FaCheck size={9} />}
                        </span>
                        <span className={`text-xs ${done || active ? "text-gray-200" : "text-gray-600"}`}>{labels[ step ]}</span>
                        {index < order.length - 1 && <span className="h-px w-3 bg-line" aria-hidden="true" />}
                    </li>
                )
            })}
        </ol>
    )
}

export default StatusSteps
