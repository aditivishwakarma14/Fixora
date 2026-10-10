import { useSelector } from "react-redux"
import { Navigate } from "react-router"
import Spinner from "../../Shared/Components/Spinner"

// login, signup and password pages are for logged out users only
const GuestOnly = ({ children }) => {
    const user = useSelector((state) => state.auth.user)
    const loading = useSelector((state) => state.auth.loading)

    if (loading) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center text-brand">
                <Spinner size={32} />
            </div>
        )
    }

    if (user) {
        return <Navigate to="/dashboard" replace />
    }

    return children
}

export default GuestOnly
