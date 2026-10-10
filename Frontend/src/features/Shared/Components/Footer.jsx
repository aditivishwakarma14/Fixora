import Logo from "./Logo";

const Footer = () => (
    <footer className="mt-auto border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-3 px-4 py-8 text-sm text-gray-500 sm:flex-row sm:items-center sm:px-6">
            <Logo className="text-lg text-gray-300" />
            <p>Fixora, local services made simple.</p>
        </div>
    </footer>
)

export default Footer
