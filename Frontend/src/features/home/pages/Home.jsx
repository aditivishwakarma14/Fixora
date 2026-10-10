import { Link } from "react-router";
import { useSelector } from "react-redux";
import { useServices } from "../../bookings/hook/useServices";
import ServiceIcon from "../../Shared/Components/ServiceIcon";
import TicketPreview from "../../Shared/Components/TicketPreview";
import { buttonStyles } from "../../Shared/Components/buttonStyles";

const steps = [
    { title: "Describe the job", text: "Pick a service and tell us what needs fixing." },
    { title: "A worker accepts", text: "Nearby workers see your request and one accepts it." },
    { title: "Job done", text: "Follow the job and get an email when it is complete." },
]

const Home = () => {
    const user = useSelector((state) => state.auth.user)
    const services = useServices()

    return (
        <main>
            {/* Hero */}
            <section className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:py-24">
                <div>
                    <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
                        Something broken at home? Get it fixed by someone nearby.
                    </h1>
                    <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-400">
                        Fixora connects you with local plumbers, electricians, carpenters and more.
                        Post the job, a worker accepts it, and you follow it until it is done.
                    </p>

                    <div className="mt-9 flex flex-wrap gap-3">
                        {!user && (
                            <>
                                <Link to="/book/new" className={buttonStyles("primary", "lg")}>Book a service</Link>
                                <Link to="/signup" className={buttonStyles("secondary", "lg")}>Work with Fixora</Link>
                            </>
                        )}
                        {user?.role === "User" && (
                            <>
                                <Link to="/book/new" className={buttonStyles("primary", "lg")}>Post a request</Link>
                                <Link to="/dashboard" className={buttonStyles("secondary", "lg")}>My requests</Link>
                            </>
                        )}
                        {user?.role === "Worker" && (
                            <Link to="/dashboard" className={buttonStyles("primary", "lg")}>Find jobs</Link>
                        )}
                    </div>
                </div>

                <TicketPreview />
            </section>

            {/* Services */}
            <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6" aria-labelledby="services-title">
                <h2 id="services-title" className="font-display text-3xl font-semibold">What can we fix for you?</h2>
                <p className="mt-2 max-w-xl text-gray-400">Choose a service to post a request.</p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => (
                        <Link
                            key={service.slug}
                            to={`/book/new?service=${service.slug}`}
                            className="group flex items-start gap-4 rounded-xl border border-line p-5 transition hover:border-brand/60 hover:bg-white/[0.03]"
                        >
                            <span className="mt-0.5 text-xl text-brand"><ServiceIcon slug={service.slug} /></span>
                            <span>
                                <span className="block font-semibold">{service.name}</span>
                                <span className="mt-1 block text-sm text-gray-400">{service.description}</span>
                            </span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* How it works */}
            <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6" aria-labelledby="how-title">
                <h2 id="how-title" className="font-display text-3xl font-semibold">How a booking works</h2>

                <ol className="mt-8 grid gap-6 md:grid-cols-3">
                    {steps.map((step, i) => (
                        <li key={step.title} className="border-t-2 border-brand pt-4">
                            <p className="font-display text-sm text-brand">Step {i + 1}</p>
                            <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
                            <p className="mt-2 text-gray-400">{step.text}</p>
                        </li>
                    ))}
                </ol>
            </section>

            {/* For workers */}
            {!user && (
                <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
                    <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-brand p-8 text-black md:flex-row md:items-center md:p-10">
                        <div>
                            <h2 className="font-display text-3xl font-semibold">Are you a skilled worker?</h2>
                            <p className="mt-2 max-w-lg">Create a Worker account, see job requests from people nearby and accept the ones you want.</p>
                        </div>
                        <Link to="/signup" className="inline-flex items-center justify-center rounded-full bg-black px-7 py-3 font-semibold text-white transition hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                            Join as a worker
                        </Link>
                    </div>
                </section>
            )}
        </main>
    )
}

export default Home
