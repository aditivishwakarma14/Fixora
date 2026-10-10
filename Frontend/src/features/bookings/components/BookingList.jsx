import Spinner from "../../Shared/Components/Spinner";
import Button from "../../Shared/Components/Button";

/**
 * Loading, error and empty states of a list of bookings.
 * `children` is rendered when there is something to show.
 */
const BookingList = ({ loading, error, onRetry, isEmpty, empty, children }) => {
    if (loading) {
        return (
            <div className="flex justify-center py-20 text-brand"><Spinner size={32} /></div>
        )
    }

    if (error) {
        return (
            <div role="alert" className="rounded-2xl border border-red-500/30 bg-red-500/5 px-6 py-10 text-center">
                <p className="text-red-300">{error}</p>
                <Button variant="secondary" size="sm" className="mt-5" onClick={onRetry}>Try again</Button>
            </div>
        )
    }

    if (isEmpty) return empty

    return <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{children}</div>
}

export default BookingList
