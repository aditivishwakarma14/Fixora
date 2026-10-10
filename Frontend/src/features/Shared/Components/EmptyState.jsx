const EmptyState = ({ title, text, action }) => (
    <div className="rounded-2xl border border-dashed border-line px-6 py-14 text-center">
        <h3 className="font-display text-xl font-semibold">{title}</h3>
        {text && <p className="mx-auto mt-2 max-w-md text-gray-400">{text}</p>}
        {action && <div className="mt-6 flex justify-center">{action}</div>}
    </div>
)

export default EmptyState
