import { useEffect, useRef } from "react";
import Button from "./Button";

/**
 * Small accessible confirm box built on the native <dialog>.
 * open: boolean, onConfirm / onClose: functions
 */
const ConfirmDialog = ({ open, title, text, confirmLabel = "Confirm", loading = false, onConfirm, onClose }) => {
    const ref = useRef(null)

    useEffect(() => {
        const dialog = ref.current
        if (!dialog) return
        if (open && !dialog.open) dialog.showModal()
        if (!open && dialog.open) dialog.close()
    }, [ open ])

    return (
        <dialog
            ref={ref}
            onClose={onClose}
            className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border border-line bg-panel p-6 text-white backdrop:bg-black/70"
        >
            <h2 className="font-display text-xl font-semibold">{title}</h2>
            {text && <p className="mt-2 text-gray-400">{text}</p>}
            <div className="mt-6 flex justify-end gap-3">
                <Button variant="secondary" size="sm" onClick={onClose}>Keep it</Button>
                <Button variant="danger" size="sm" loading={loading} onClick={onConfirm}>{confirmLabel}</Button>
            </div>
        </dialog>
    )
}

export default ConfirmDialog
