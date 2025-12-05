import {useState} from 'react';
import {Loader2, X} from 'lucide-react';
import {getErrorResponseMessage} from "../../../../utils/responses.jsx";
import {toast} from "react-toastify";
import api from "../../../../services/api.tsx";

export default function AddLaboratoryModal({isOpen, onClose, onSuccess}) {
    const [formData, setFormData] = useState({
        title: '',
        order_index: 0,
    });
    const [loading, setLoading] = useState(false);
    const [mouseDownTarget, setMouseDownTarget] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (formData.title.trim() === '') {
            toast.error("Title is required");
            setLoading(false);
            return;
        }
        try {
            const token = localStorage.getItem("token");
            const response = await api.post("http://localhost:8000/api/v1/laboratory", formData, {
                headers: {Authorization: `Bearer ${token}`},
            })
            if (response.status === 201) {
                toast.success("Laboratory created successfully");
            }
            setFormData({title: '', order_index: 0});
            onSuccess();
            onClose();
        } catch (err) {
            const message = getErrorResponseMessage(err);
            toast.error(message || 'Failed to create laboratory');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (!loading) {
            setFormData({title: '', order_index: 0});
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
                    <h2 className="text-2xl font-bold text-slate-900">Create New Laboratory</h2>
                    <button
                        onClick={handleClose}
                        disabled={loading}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        <X className="w-5 h-5 text-slate-600"/>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">

                    <div className="space-y-5">
                        <div>
                            <label htmlFor="title" className="block text-sm font-semibold text-slate-700 mb-2">
                                Laboratory Title *
                            </label>
                            <input
                                id="title"
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                placeholder="e.g., SQL Fundamentals"
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label htmlFor="order_index" className="block text-sm font-semibold text-slate-700 mb-2">
                                Order Index
                            </label>
                            <input
                                id="order_index"
                                type="number"
                                value={formData.order_index}
                                onChange={(e) => setFormData({...formData, order_index: parseInt(e.target.value) || 0})}
                                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                min="0"
                                disabled={loading}
                            />
                            <p className="mt-1 text-xs text-slate-500">Lower numbers appear first</p>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-8">
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={loading}
                            className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-12 h-12 flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin"/>
                                    <span>Creating...</span>
                                </>
                            ) : (
                                <span>Create Laboratory</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
