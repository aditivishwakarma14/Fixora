import { FaCheck } from "react-icons/fa";

const steps = [
    { label: "Requested", state: "done" },
    { label: "Accepted", state: "current" },
    { label: "Completed", state: "todo" },
]

/**
 * The example job ticket (hero of the home page and the auth pages).
 * It only shows how a booking moves forward, it is not real data.
 */
const TicketPreview = ({ className = "" }) => (
    <div
        className={`rounded-2xl border border-line bg-panel p-6 shadow-[0_0_0_6px_rgba(250,204,21,0.04)] ${className}`}
        aria-label="Example of a booking"
    >
        <p className="text-sm text-gray-500">Example booking</p>
        <h2 className="mt-1 font-display text-2xl font-semibold">Leaking kitchen tap</h2>
        <p className="mt-1 text-gray-400">Plumber, needed today</p>

        <div className="my-6 border-t border-dashed border-line" />

        <ol className="space-y-5">
            {steps.map((s) => (
                <li key={s.label} className="flex items-center gap-4">
                    <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm ${
                            s.state === "done"
                                ? "bg-brand text-black"
                                : s.state === "current"
                                    ? "border-2 border-brand text-brand"
                                    : "border border-gray-600 text-gray-600"
                        }`}
                    >
                        {s.state === "done" && <FaCheck size={12} />}
                        {s.state === "current" && (
                            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-brand motion-reduce:animate-none" />
                        )}
                    </span>
                    <span className={s.state === "todo" ? "text-gray-600" : "text-gray-100"}>{s.label}</span>
                </li>
            ))}
        </ol>

        <div className="mt-6 rounded-xl bg-white/5 px-4 py-3 text-sm text-gray-300">
            Ravi accepted your request and will contact you shortly.
        </div>
    </div>
)

export default TicketPreview
