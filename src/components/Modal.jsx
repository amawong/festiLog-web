import { useEffect } from "react"

function Modal({ onClose, children }) {
    useEffect(() => {
        const onKey = (e) => e.key === 'Escape' && onClose()
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [onClose])

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
                <button type="button" className="modal-close" onClick={onClose} aria-label="Close">×</button>
                {children}
            </div>
        </div>
    )
}

export default Modal