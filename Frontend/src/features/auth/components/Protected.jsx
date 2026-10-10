import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router"
import Spinner from "../../Shared/Components/Spinner"

/**
 * Only for logged in users. Optional `role` ("User" | "Worker").
 * Guests are sent to /login and come back here after logging in.
 */
const Protected = ({ children, role }) => {
    const user = useSelector((state) => state.auth.user)
    const loading = useSelector((state) => state.auth.loading)
    const location = useLocation()

    if (loading) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center text-brand">
                <Spinner size={32} />
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />
    }

    if (role && user.role !== role) {
        return <Navigate to="/dashboard" replace />
    }

    return children
}

export default Protected
