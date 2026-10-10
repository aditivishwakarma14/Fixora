const StatCard = ({ label, value }) => (
    <div className="rounded-2xl border border-line bg-panel px-5 py-4">
        <p className="text-sm text-gray-400">{label}</p>
        <p className="mt-1 font-display text-3xl font-semibold">{value}</p>
    </div>
)

export default StatCard
