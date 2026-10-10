// the same page frame for every logged in page
const PageShell = ({ title, subtitle, action, children }) => (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <h1 className="font-display text-3xl font-semibold sm:text-4xl">{title}</h1>
                {subtitle && <p className="mt-2 max-w-2xl text-gray-400">{subtitle}</p>}
            </div>
            {action}
        </div>
        {children}
    </main>
)

export default PageShell
