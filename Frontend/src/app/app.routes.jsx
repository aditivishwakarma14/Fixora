import { createBrowserRouter } from "react-router";
import AppLayout from "./AppLayout";
import Home from "../features/home/pages/Home";
import Signup from "../features/auth/pages/Signup";
import Login from "../features/auth/pages/Login";
import VerifyOtp from "../features/auth/pages/VerifyOtp";
import ForgotPassword from "../features/auth/pages/ForgotPassword";
import ForgotPasswordOtpVerify from "../features/auth/pages/ForgotPasswordOtpVerify";
import ResetPassword from "../features/auth/pages/ResetPassword";
import Protected from "../features/auth/components/Protected";
import GuestOnly from "../features/auth/components/GuestOnly";
import Dashboard from "../features/bookings/pages/Dashboard";
import NewBooking from "../features/bookings/pages/NewBooking";
import Account from "../features/account/pages/Account";
import NotFound from "../features/Shared/pages/NotFound";

export const routes = createBrowserRouter([

    {
        element: <AppLayout />,
        children: [
            { path: "/", element: <Home /> },

            // logged out only
            { path: "/signup", element: <GuestOnly><Signup /></GuestOnly> },
            { path: "/login", element: <GuestOnly><Login /></GuestOnly> },
            { path: "/verify-otp", element: <GuestOnly><VerifyOtp /></GuestOnly> },
            { path: "/forgot-password", element: <GuestOnly><ForgotPassword /></GuestOnly> },
            { path: "/forgot-password-otp-verify", element: <GuestOnly><ForgotPasswordOtpVerify /></GuestOnly> },
            { path: "/reset-password", element: <GuestOnly><ResetPassword /></GuestOnly> },

            // logged in only
            { path: "/dashboard", element: <Protected><Dashboard /></Protected> },
            { path: "/book/new", element: <Protected role="User"><NewBooking /></Protected> },
            { path: "/account", element: <Protected><Account /></Protected> },

            { path: "*", element: <NotFound /> }
        ]
    }

])
