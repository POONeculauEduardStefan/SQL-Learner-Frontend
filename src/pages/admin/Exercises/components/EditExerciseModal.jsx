import {useEffect, useState} from 'react';
import {Loader2, X} from 'lucide-react';
import {toast} from "react-toastify";
import api from "../../../../services/api.tsx";
import {getErrorResponseMessage} from "../../../../utils/responses.jsx";

export default function EditExerciseModal({isOpen, onClose, onSuccess, exercise, laboratories}) {
    const [formData, setFormData] = useState({
        request: '',
        response: '',
        order_index: 0,
        laboratory_id: '',
    });
    const [loading, setLoading] = useState(false);
    const [mouseDownTarget, setMouseDownTarget] = useState(null);

    useEffect(() => {
        if (exercise && isOpen) {
            setFormData({
                request: exercise.request || '',
                response: exercise.response || '',
                order_index: exercise.order_index || 0,
                laboratory_id: exercise.laboratory_id || '',
            });
        }
    }, [exercise, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (formData.request.trim() === '' || formData.response.trim() === '') {
            toast.error("Request and response are required");
            setLoading(false);
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const response = await api.put(
                `http://localhost:8000/api/v1/exercise/${exercise.id}`,
                formData,
                {headers: {Authorization: `Bearer ${token}`}}
            );

            if (response.status === 200) {
                toast.success("Exercise updated successfully");
                onSuccess();
                onClose();
            }
        } catch (err) {
            const message = getErrorResponseMessage(err);
            toast.error(message || 'Failed to update exercise');
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
        <div
            className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4"
            onMouseDown={handleBackdropMouseDown}
            onMouseUp={handleBackdropMouseUp}>
            <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[95vh] overflow-y-auto">
                <div
                    className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-slate-900">Edit Exercise</h2>
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
                            <label htmlFor="laboratory" className="block text-sm font-semibold text-slate-700 mb-2">
                                Laboratory *
                            </label>
                            <select
                                id="laboratory"
                                onChange={(e) => setFormData({...formData, laboratory_id: e.target.value})}
                                value={formData?.laboratory_id || ''}
                                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900 font-medium cursor-pointer hover:border-slate-400"
                            >
                                <option value="" className="text-slate-500">Select a laboratory...</option>
                                {laboratories.map((lab) => (
                                    <option key={lab.id} value={lab.id} className="text-slate-900">
                                        {lab.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="request" className="block text-sm font-semibold text-slate-700 mb-2">
                                Request *
                            </label>
                            <textarea
                                id="request"
                                value={formData.request}
                                onChange={(e) => setFormData({...formData, request: e.target.value})}
                                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                placeholder="Enter the request/question..."
                                rows="4"
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label htmlFor="response" className="block text-sm font-semibold text-slate-700 mb-2">
                                Response *
                            </label>
                            <textarea
                                id="response"
                                value={formData.response}
                                onChange={(e) => setFormData({...formData, response: e.target.value})}
                                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                placeholder="Enter the response/answer..."
                                rows="4"
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
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin"/>
                                    <span>Saving...</span>
                                </>
                            ) : (
                                <span>Save Exercise</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}