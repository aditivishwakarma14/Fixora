import TicketPreview from "../../Shared/Components/TicketPreview";

/**
 * Shared frame of every auth page: form card on the right,
 * the example job ticket on the left (large screens only).
 */
const AuthLayout = ({ title, subtitle, children, footer }) => (
    <main className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-10 sm:px-6 sm:py-14 lg:min-h-[calc(100vh-9rem)] lg:grid-cols-2">
        <aside className="hidden lg:block">
            <h2 className="max-w-md font-display text-4xl font-semibold leading-tight">
                Post the job. A worker nearby picks it up.
            </h2>
            <p className="mt-4 max-w-md text-gray-400">
                Follow every request from the moment you post it until the work is done.
            </p>
            <TicketPreview className="mt-10 max-w-md" />
        </aside>

        <section className="mx-auto w-full max-w-md">
            <div className="rounded-2xl border border-line bg-panel p-6 sm:p-8">
                <h1 className="font-display text-3xl font-semibold">{title}</h1>
                {subtitle && <p className="mt-2 text-gray-400">{subtitle}</p>}
                <div className="mt-7">{children}</div>
            </div>
            {footer && <p className="mt-6 text-center text-sm text-gray-400">{footer}</p>}
        </section>
    </main>
)

export default AuthLayout
