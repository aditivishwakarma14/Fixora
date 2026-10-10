import { useSelector } from "react-redux";
import CustomerDashboard from "./CustomerDashboard";
import WorkerDashboard from "./WorkerDashboard";

// one url (/dashboard), two views depending on the account role
const Dashboard = () => {
    const user = useSelector((state) => state.auth.user)

    return user.role === "Worker" ? <WorkerDashboard /> : <CustomerDashboard />
}

export default Dashboard
