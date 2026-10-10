import { useId, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const fieldBase = "w-full rounded-lg border bg-raised px-4 py-2.5 text-white placeholder:text-gray-500 transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"

const Field = ({ id, label, error, hint, children }) => (
    <div className="w-full">
        {label && <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-gray-200">{label}</label>}
        {children}
        {error
            ? <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-red-400">{error}</p>
            : hint && <p id={`${id}-hint`} className="mt-1.5 text-sm text-gray-500">{hint}</p>}
    </div>
)

const describedBy = (id, error, hint) => (error ? `${id}-error` : hint ? `${id}-hint` : undefined)

export const Input = ({ label, error, hint, type = "text", className = "", ...props }) => {
    const id = useId()
    const [ visible, setVisible ] = useState(false)
    const isPassword = type === "password"

    return (
        <Field id={id} label={label} error={error} hint={hint}>
            <div className="relative">
                <input
                    id={id}
                    type={isPassword && visible ? "text" : type}
                    aria-invalid={Boolean(error)}
                    aria-describedby={describedBy(id, error, hint)}
                    className={`${fieldBase} ${error ? "border-red-500/70" : "border-line"} ${isPassword ? "pr-11" : ""} ${className}`}
                    {...props}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setVisible((v) => !v)}
                        aria-label={visible ? "Hide password" : "Show password"}
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white"
                    >
                        {visible ? <FaEyeSlash /> : <FaEye />}
                    </button>
                )}
            </div>
        </Field>
    )
}

export const Textarea = ({ label, error, hint, className = "", ...props }) => {
    const id = useId()

    return (
        <Field id={id} label={label} error={error} hint={hint}>
            <textarea
                id={id}
                aria-invalid={Boolean(error)}
                aria-describedby={describedBy(id, error, hint)}
                className={`${fieldBase} min-h-28 resize-y ${error ? "border-red-500/70" : "border-line"} ${className}`}
                {...props}
            />
        </Field>
    )
}

export const Select = ({ label, error, hint, children, className = "", ...props }) => {
    const id = useId()

    return (
        <Field id={id} label={label} error={error} hint={hint}>
            <select
                id={id}
                aria-invalid={Boolean(error)}
                aria-describedby={describedBy(id, error, hint)}
                className={`${fieldBase} ${error ? "border-red-500/70" : "border-line"} ${className}`}
                {...props}
            >
                {children}
            </select>
        </Field>
    )
}
