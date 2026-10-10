import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../../auth/hook/useAuth";
import Logo from "./Logo";
import Button from "./Button";
import { buttonStyles } from "./buttonStyles";

const linkClass = ({ isActive }) =>
    `rounded-full px-3 py-1.5 text-sm font-medium transition ${isActive ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"}`

const Nav = () => {
    const navigate = useNavigate()
    const { handleLogout } = useAuth()
    const user = useSelector((state) => state.auth.user)
    const [ open, setOpen ] = useState(false)

    const close = () => setOpen(false)

    const logoutHandler = async () => {
        close()
        await handleLogout()
        toast.success("Logged out")
        navigate("/login")
    }

    return (
        <header className="sticky top-0 z-30 border-b border-line bg-ink/85 backdrop-blur">
            <nav className="mx-auto flex h-16 w-full max-w-6xl items-center gap-2 px-4 sm:px-6" aria-label="Main">
                <Logo />

                {/* desktop */}
                <div className="ml-6 hidden items-center gap-1 md:flex">
                    <NavLink to="/" end className={linkClass}>Home</NavLink>
                    {user && <NavLink to="/dashboard" className={linkClass}>{user.role === "Worker" ? "Jobs" : "My requests"}</NavLink>}
                    {user && <NavLink to="/account" className={linkClass}>Account</NavLink>}
                </div>

                <div className="ml-auto hidden items-center gap-3 md:flex">
                    {user ? (
                        <>
                            <span className="text-sm text-gray-400">Hi, {user.fullName.split(" ")[ 0 ]}</span>
                            <Button variant="secondary" size="sm" onClick={logoutHandler}>Log out</Button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="px-3 py-1.5 text-sm font-medium text-gray-300 transition hover:text-white">Log in</Link>
                            <Link to="/signup" className={buttonStyles("primary", "sm")}>Sign up</Link>
                        </>
                    )}
                </div>

                {/* mobile */}
                <button
                    className="ml-auto cursor-pointer rounded-lg p-2 text-gray-300 hover:bg-white/5 md:hidden"
                    onClick={() => setOpen((o) => !o)}
                    aria-label={open ? "Close menu" : "Open menu"}
                    aria-expanded={open}
                    aria-controls="mobile-menu"
                >
                    {open ? <FaTimes /> : <FaBars />}
                </button>
            </nav>

            {open && (
                <div id="mobile-menu" className="border-t border-line bg-ink px-4 pb-5 pt-3 md:hidden">
                    <div className="flex flex-col gap-1">
                        <NavLink to="/" end className={linkClass} onClick={close}>Home</NavLink>
                        {user && <NavLink to="/dashboard" className={linkClass} onClick={close}>{user.role === "Worker" ? "Jobs" : "My requests"}</NavLink>}
                        {user && <NavLink to="/account" className={linkClass} onClick={close}>Account</NavLink>}
                    </div>

                    <div className="mt-4 flex flex-col gap-3 border-t border-line pt-4">
                        {user ? (
                            <>
                                <span className="text-sm text-gray-400">Signed in as {user.fullName}</span>
                                <Button variant="secondary" onClick={logoutHandler}>Log out</Button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" onClick={close} className={buttonStyles("secondary")}>Log in</Link>
                                <Link to="/signup" onClick={close} className={buttonStyles("primary")}>Sign up</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    )
}

export default Nav
