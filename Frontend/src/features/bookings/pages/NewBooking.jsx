import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import toast from "react-hot-toast";
import { createBooking } from "../service/booking.api";
import { useServices } from "../hook/useServices";
import { getErrorMessage } from "../../Shared/utils/getErrorMessage";
import { todayInputValue } from "../../Shared/utils/format";
import PageShell from "../../Shared/Components/PageShell";
import ServiceIcon from "../../Shared/Components/ServiceIcon";
import { Input, Textarea } from "../../Shared/Components/Input";
import Button from "../../Shared/Components/Button";

const NewBooking = () => {
    const services = useServices()
    const navigate = useNavigate()
    const [ params ] = useSearchParams()
    const [ form, setForm ] = useState({
        service: params.get("service") || "",
        title: "",
        description: "",
        address: "",
        preferredDate: "",
    })
    const [ errors, setErrors ] = useState({})
    const [ loading, setLoading ] = useState(false)

    const onChange = (e) => {
        setForm((prev) => ({ ...prev, [ e.target.name ]: e.target.value }))
        setErrors((prev) => ({ ...prev, [ e.target.name ]: "" }))
    }

    const submit = async (e) => {
        e.preventDefault()

        const next = {}
        if (!form.service) next.service = "Choose a service"
        if (form.title.trim().length < 3) next.title = "Give the job a short title (at least 3 characters)"
        if (form.description.trim().length < 10) next.description = "Describe the problem in at least 10 characters"
        if (form.address.trim().length < 5) next.address = "Enter the address where the work is needed"
        setErrors(next)
        if (Object.keys(next).length) return

        setLoading(true)
        try {
            const data = await createBooking({ ...form, preferredDate: form.preferredDate || undefined })
            toast.success(data.message)
            navigate("/dashboard", { replace: true })
        } catch (error) {
            toast.error(getErrorMessage(error))
            setLoading(false)
        }
    }

    return (
        <PageShell title="Post a request" subtitle="Tell workers what needs fixing. One of them can accept it.">
            <form onSubmit={submit} noValidate className="max-w-3xl space-y-8">
                <fieldset>
                    <legend className="mb-3 text-sm font-medium text-gray-200">What do you need?</legend>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {services.map((s) => (
                            <label
                                key={s.slug}
                                className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand ${
                                    form.service === s.slug ? "border-brand bg-brand/10" : "border-line hover:border-gray-500"
                                }`}
                            >
                                <input type="radio" name="service" value={s.slug} checked={form.service === s.slug} onChange={onChange} className="sr-only" />
                                <ServiceIcon slug={s.slug} className="shrink-0 text-brand" />
                                <span className="text-sm font-medium">{s.name}</span>
                            </label>
                        ))}
                    </div>
                    {errors.service && <p role="alert" className="mt-2 text-sm text-red-400">{errors.service}</p>}
                </fieldset>

                <div className="space-y-5">
                    <Input label="Title" name="title" maxLength={80} placeholder="For example: Leaking kitchen tap" value={form.title} onChange={onChange} error={errors.title} />
                    <Textarea
                        label="What is the problem?"
                        name="description"
                        maxLength={1000}
                        placeholder="Describe what is wrong and anything the worker should know"
                        value={form.description}
                        onChange={onChange}
                        error={errors.description}
                        hint={`${form.description.length}/1000`}
                    />
                    <Input label="Address" name="address" maxLength={200} autoComplete="street-address" placeholder="House number, street, area" value={form.address} onChange={onChange} error={errors.address} />
                    <Input label="Preferred date (optional)" name="preferredDate" type="date" min={todayInputValue()} value={form.preferredDate} onChange={onChange} className="sm:max-w-xs" />
                </div>

                <div className="flex flex-wrap gap-3">
                    <Button type="submit" size="lg" loading={loading}>Post request</Button>
                    <Button variant="secondary" size="lg" onClick={() => navigate("/dashboard")}>Cancel</Button>
                </div>
            </form>
        </PageShell>
    )
}

export default NewBooking
