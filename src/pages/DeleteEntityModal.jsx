import {useState} from 'react';
import {Loader2, X} from 'lucide-react';
import {toast} from "react-toastify";
import {getErrorResponseMessage} from "../utils/responses.jsx";

export default function DeleteEntityModal({isOpen, onClose, deleteEntity, entityId, entityName}) {
    const [loading, setLoading] = useState(false);
    const [mouseDownTarget, setMouseDownTarget] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await deleteEntity(entityId);
            onClose();
        } catch (err) {
            const message = getErrorResponseMessage(err);
            toast.error(message || `Failed to delete ${entityName}.`);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (!loading) {
            onClose();
        }
    };

    const handleBackdropMouseDown = (e) => {
        setMouseDownTarget(e.target);
    };

    const handleBackdropMouseUp = (e) => {
        if (mouseDownTarget === e.currentTarget && e.target === e.currentTarget && !loading) {
            handleClose();
        }
        setMouseDownTarget(null);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4"
             onMouseDown={handleBackdropMouseDown}
             onMouseUp={handleBackdropMouseUp}>
            <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                <div
                    className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-900">Delete {entityName}?</h2>
                    <button
                        onClick={handleClose}
                        disabled={loading}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        <X className="w-5 h-5 text-slate-600"/>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <p className="text-slate-600 mb-6">This action cannot be undone. Are you sure you want to do
                        this?</p>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={loading}
                            className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin"/>
                                    <span>Deleting...</span>
                                </>
                            ) : (
                                <span>Delete {entityName}</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}