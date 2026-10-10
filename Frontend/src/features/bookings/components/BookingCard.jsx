import { FaMapMarkerAlt, FaRegCalendarAlt } from "react-icons/fa";
import ServiceIcon from "../../Shared/Components/ServiceIcon";
import StatusBadge from "../../Shared/Components/StatusBadge";
import StatusSteps from "./StatusSteps";
import { formatDate, timeAgo } from "../../Shared/utils/format";

/**
 * One booking. `viewer` is "User" or "Worker" and decides which person is shown.
 * `services` is the catalog, `actions` is a node with the buttons.
 */
const BookingCard = ({ booking, viewer, services, actions }) => {
    const serviceName = services.find((s) => s.slug === booking.service)?.name || booking.service

    let person = ""
    if (viewer === "Worker") {
        person = `Requested by ${booking.customer.name}`
    } else if (booking.worker) {
        person = `${booking.status === "completed" ? "Completed" : "Accepted"} by ${booking.worker.name}`
    } else if (booking.status === "requested") {
        person = "Waiting for a worker to accept"
    }

    return (
        <article className="flex flex-col rounded-2xl border border-line bg-panel p-5">
            <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 flex-1 items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                        <ServiceIcon slug={booking.service} />
                    </span>
                    <div className="min-w-0">
                        <h3 className="line-clamp-2 break-words font-display text-lg font-semibold leading-snug">{booking.title}</h3>
                        <p className="text-sm text-gray-400">{serviceName}<span aria-hidden="true"> · </span><span className="whitespace-nowrap">{timeAgo(booking.createdAt)}</span></p>
                    </div>
                </div>
                <StatusBadge status={booking.status} />
            </div>

            <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-gray-300">{booking.description}</p>

            <ul className="mt-4 space-y-1.5 text-sm text-gray-400">
                <li className="flex items-start gap-2"><FaMapMarkerAlt className="mt-1 shrink-0" aria-hidden="true" /><span>{booking.address}</span></li>
                {booking.preferredDate && (
                    <li className="flex items-center gap-2"><FaRegCalendarAlt className="shrink-0" aria-hidden="true" /><span>Preferred date: {formatDate(booking.preferredDate)}</span></li>
                )}
            </ul>

            <div className="mt-5 border-t border-line pt-4">
                <StatusSteps status={booking.status} />
                {person && <p className="mt-3 text-sm text-gray-400">{person}</p>}
            </div>

            {actions && <div className="mt-4 flex flex-wrap gap-3">{actions}</div>}
        </article>
    )
}

export default BookingCard
