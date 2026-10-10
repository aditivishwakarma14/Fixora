import { Outlet, ScrollRestoration } from "react-router"
import Nav from "../features/Shared/Components/Nav"
import Footer from "../features/Shared/Components/Footer"

const AppLayout = () => {
    return (
        <div className="flex min-h-screen flex-col">
            <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-black">
                Skip to content
            </a>
            <Nav />
            <div id="content" className="flex-1">
                <Outlet />
            </div>
            <Footer />
            <ScrollRestoration />
        </div>
    )
}

export default AppLayout
