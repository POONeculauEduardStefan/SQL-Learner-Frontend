import React, {useState} from 'react';
import {Loader2, X} from "lucide-react";
import api from "../../../../services/api.js";
import {getErrorResponseMessage} from "../../../../utils/responses.jsx";
import {toast} from "react-toastify";

const ReportExerciseModal = ({isOpen, onClose, exercise, laboratory}) => {
    const [loading, setLoading] = useState(false);
    const [mouseDownTarget, setMouseDownTarget] = useState(null);
    const [formData, setFormData] = useState({
        request: '',
        title: '',
    });

    const handleAddReport = async (e) => {
        e.preventDefault();
        if(!formData.request || !formData.title) {
            toast.error("Please fill in all fields.");
            return;
        }
        try {
            setLoading(true);
            const response = await api.post("http://127.0.0.1:8000/api/v1/report", {
                request: formData.request,
                title: formData.title,
                exercise_id: exercise.id,
                laboratory_id: laboratory.id,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.status === 201) {
                toast.success("Report submitted successfully!");
                setFormData({request: '', title: ''});
                onClose();
            }
        } catch (error) {
            const message = getErrorResponseMessage(error);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }

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
            <div className="bg-white rounded-2xl shadow-xl lg:w-5xl max-h-[90vh] overflow-y-auto p-3 lg:p-5">
                <div
                    className="sticky top-0 bg-white border-b border-slate-200 px-6 py-1 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-slate-900">Report a problem</h2>
                    <button
                        onClick={handleClose}
                        disabled={loading}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        <X className="w-5 h-5 text-slate-600"/>
                    </button>
                </div>
                <div className="flex flex-col">
                        <form onSubmit={handleAddReport}
                              className="border-b lg:border-b-0 lg:border-r border-slate-200 lg:col-span-4 px-6 py-2">
                            <div className="space-y-5">
                                <p
                                    className="w-full px-4 py-3 border border-slate-300 rounded-xl bg-slate-100 text-slate-700 outline-none transition-all font-bold break-all"
                                >
                                    Exercise: {exercise.request}
                                </p>
                                <label htmlFor="title" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Title
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    placeholder="Briefly summarize the issue..."
                                    disabled={loading}
                                />
                                <label htmlFor="request" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Report
                                </label>
                                <textarea
                                    id="request"
                                    value={formData.request}
                                    onChange={(e) => setFormData({...formData, request: e.target.value})}
                                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    placeholder="Describe the issue you encountered with this exercise..."
                                    rows="4"
                                    disabled={loading}
                                />
                            </div>
                            <div className="flex gap-3 justify-end mt-8 w-full lg:w-[40%] mx-auto text-xs lg:text-base">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    disabled={loading}
                                    className="flex-1 h-12 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 h-12 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin"/>
                                            <span>Saving...</span>
                                        </>
                                    ) : (
                                        <span>Send report</span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
            </div>
        </div>
    )
}

export default ReportExerciseModal;
