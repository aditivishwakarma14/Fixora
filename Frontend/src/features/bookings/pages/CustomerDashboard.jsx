import { useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { useFetch } from "../../Shared/hook/useFetch";
import { getMyBookings, cancelBooking } from "../service/booking.api";
import { useServices } from "../hook/useServices";
import { getErrorMessage } from "../../Shared/utils/getErrorMessage";
import PageShell from "../../Shared/Components/PageShell";
import EmptyState from "../../Shared/Components/EmptyState";
import ConfirmDialog from "../../Shared/Components/ConfirmDialog";
import Button from "../../Shared/Components/Button";
import { buttonStyles } from "../../Shared/Components/buttonStyles";
import BookingCard from "../components/BookingCard";
import BookingList from "../components/BookingList";
import StatCard from "../components/StatCard";

const filters = [
    { value: "all", label: "All" },
    { value: "requested", label: "Waiting" },
    { value: "accepted", label: "Accepted" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
]

const CustomerDashboard = () => {
    const services = useServices()
    const { data, loading, error, reload } = useFetch(getMyBookings)
    const [ filter, setFilter ] = useState("all")
    const [ cancelTarget, setCancelTarget ] = useState(null)
    const [ cancelling, setCancelling ] = useState(false)

    const bookings = data || []
    const visible = filter === "all" ? bookings : bookings.filter((b) => b.status === filter)
    const count = (status) => bookings.filter((b) => b.status === status).length

    const confirmCancel = async () => {
        setCancelling(true)
        try {
            const result = await cancelBooking(cancelTarget.id)
            toast.success(result.message)
        } catch (err) {
            toast.error(getErrorMessage(err))
        } finally {
            setCancelling(false)
            setCancelTarget(null)
            reload()
        }
    }

    return (
        <PageShell
            title="My requests"
            subtitle="Everything you have posted, and where it stands."
            action={<Link to="/book/new" className={buttonStyles("primary", "md")}><FaPlus size={12} /> New request</Link>}
        >
            <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <StatCard label="Total" value={bookings.length} />
                <StatCard label="Waiting" value={count("requested")} />
                <StatCard label="Accepted" value={count("accepted")} />
                <StatCard label="Completed" value={count("completed")} />
            </div>

            <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter requests">
                {filters.map((f) => (
                    <button
                        key={f.value}
                        onClick={() => setFilter(f.value)}
                        aria-pressed={filter === f.value}
                        className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition ${
                            filter === f.value ? "bg-brand text-black" : "border border-line text-gray-300 hover:border-gray-500"
                        }`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            <BookingList
                loading={loading}
                error={error}
                onRetry={reload}
                isEmpty={visible.length === 0}
                empty={
                    bookings.length === 0
                        ? <EmptyState
                            title="No requests yet"
                            text="Post your first job and a worker nearby can pick it up."
                            action={<Link to="/book/new" className={buttonStyles("primary")}>Post a request</Link>}
                        />
                        : <EmptyState title="Nothing here" text="No requests match this filter." />
                }
            >
                {visible.map((booking) => (
                    <BookingCard
                        key={booking.id}
                        booking={booking}
                        viewer="User"
                        services={services}
                        actions={
                            [ "requested", "accepted" ].includes(booking.status) && (
                                <Button variant="danger" size="sm" onClick={() => setCancelTarget(booking)}>Cancel request</Button>
                            )
                        }
                    />
                ))}
            </BookingList>

            <ConfirmDialog
                open={Boolean(cancelTarget)}
                title="Cancel this request?"
                text={cancelTarget ? `"${cancelTarget.title}" will be cancelled${cancelTarget.worker ? " and the worker will be told" : ""}.` : ""}
                confirmLabel="Cancel request"
                loading={cancelling}
                onConfirm={confirmCancel}
                onClose={() => setCancelTarget(null)}
            />
        </PageShell>
    )
}

export default CustomerDashboard
