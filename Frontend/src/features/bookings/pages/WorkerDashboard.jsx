import { useState } from "react";
import toast from "react-hot-toast";
import { useFetch } from "../../Shared/hook/useFetch";
import { acceptBooking, completeBooking, getMyBookings, getOpenBookings } from "../service/booking.api";
import { useServices } from "../hook/useServices";
import { getErrorMessage } from "../../Shared/utils/getErrorMessage";
import PageShell from "../../Shared/Components/PageShell";
import EmptyState from "../../Shared/Components/EmptyState";
import Button from "../../Shared/Components/Button";
import { Select } from "../../Shared/Components/Input";
import BookingCard from "../components/BookingCard";
import BookingList from "../components/BookingList";
import StatCard from "../components/StatCard";

const tabs = [
    { value: "open", label: "Open jobs" },
    { value: "mine", label: "My jobs" },
]

const WorkerDashboard = () => {
    const services = useServices()
    const [ tab, setTab ] = useState("open")
    const [ service, setService ] = useState("")
    const [ busyId, setBusyId ] = useState(null)

    const open = useFetch(() => getOpenBookings(service), [ service ])
    const mine = useFetch(getMyBookings)

    const myJobs = mine.data || []
    const openJobs = open.data || []

    // runs an action on one booking, then refreshes both lists
    const run = async (id, action) => {
        setBusyId(id)
        try {
            const result = await action(id)
            toast.success(result.message)
        } catch (err) {
            toast.error(getErrorMessage(err))
        } finally {
            setBusyId(null)
            open.reload()
            mine.reload()
        }
    }

    const current = tab === "open" ? open : mine
    const list = tab === "open" ? openJobs : myJobs

    return (
        <PageShell title="Jobs" subtitle="Accept a job, do the work, then mark it as completed.">
            <div className="mb-8 grid grid-cols-3 gap-4">
                <StatCard label="Open near you" value={openJobs.length} />
                <StatCard label="In progress" value={myJobs.filter((b) => b.status === "accepted").length} />
                <StatCard label="Completed" value={myJobs.filter((b) => b.status === "completed").length} />
            </div>

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex gap-2" role="tablist" aria-label="Jobs">
                    {tabs.map((t) => (
                        <button
                            key={t.value}
                            role="tab"
                            aria-selected={tab === t.value}
                            onClick={() => setTab(t.value)}
                            className={`cursor-pointer rounded-full px-5 py-2 text-sm font-semibold transition ${
                                tab === t.value ? "bg-brand text-black" : "border border-line text-gray-300 hover:border-gray-500"
                            }`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                {tab === "open" && (
                    <div className="w-full sm:w-64">
                        <Select label="Service" value={service} onChange={(e) => setService(e.target.value)}>
                            <option value="">All services</option>
                            {services.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
                        </Select>
                    </div>
                )}
            </div>

            <BookingList
                loading={current.loading}
                error={current.error}
                onRetry={current.reload}
                isEmpty={list.length === 0}
                empty={
                    tab === "open"
                        ? <EmptyState title="No open jobs right now" text="New requests from users show up here. Check again in a little while." />
                        : <EmptyState title="You have no jobs yet" text="Accept a job from the Open jobs tab and it will appear here." />
                }
            >
                {list.map((booking) => (
                    <BookingCard
                        key={booking.id}
                        booking={booking}
                        viewer="Worker"
                        services={services}
                        actions={
                            tab === "open"
                                ? <Button size="sm" loading={busyId === booking.id} onClick={() => run(booking.id, acceptBooking)}>Accept job</Button>
                                : booking.status === "accepted" && (
                                    <Button size="sm" loading={busyId === booking.id} onClick={() => run(booking.id, completeBooking)}>Mark as completed</Button>
                                )
                        }
                    />
                ))}
            </BookingList>
        </PageShell>
    )
}

export default WorkerDashboard
