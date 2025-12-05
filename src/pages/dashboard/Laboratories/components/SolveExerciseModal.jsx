import React, {useEffect, useState} from 'react';
import {BookOpen, Loader2, X} from "lucide-react";
import api from "../../../../services/api.js";
import {getErrorResponseMessage, getSuccessData} from "../../../../utils/responses.jsx";
import {toast} from "react-toastify";

const SolveExerciseModal = ({isOpen, onClose, exercise, fetchExercisesByLabId, laboratory}) => {
    const [loading, setLoading] = useState(false);
    const [mouseDownTarget, setMouseDownTarget] = useState(null);
    const [formData, setFormData] = useState({
        response: '',
    });
    const [history, setHistory] = useState([]);
    const [isExercisedSolved, setIsExercisedSolved] = useState(false);

    const handleAddResponse = async (e) => {
        e.preventDefault();
        if (formData.response.trim() === '') {
            toast.error("Response cannot be empty.");
            return;
        }
        try {
            setLoading(true);
            const response = await api.post("http://127.0.0.1:8000/api/v1/exercise_history", {
                exercise_id: exercise.id,
                response: formData.response,
                correct_response: exercise.response,
                laboratory_id: laboratory.id
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.status === 201) {
                toast.success("Response submitted successfully!");
                setFormData({response: ''});
                await fetchHistory(exercise.id);
                await fetchExercisesByLabId(laboratory.id);
            }
        } catch (error) {
            const message = getErrorResponseMessage(error);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }

    const fetchHistory = async (exerciseId) => {
        try {
            const response = await api.get(`http://127.0.0.1:8000/api/v1/exercise_history/by-exercise/${exerciseId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.status === 200) {
                const historyData = getSuccessData(response).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setHistory(historyData);
                verifyIfExerciseSolved(historyData);
            }
        } catch (error) {
            const message = getErrorResponseMessage(error);
            toast.error(message);
        }
    }

    const verifyIfExerciseSolved = (historyData) => {
        const solved = historyData.some(item => item.success);
        setIsExercisedSolved(solved);
    }

    useEffect(() => {
        fetchHistory(exercise.id)
    }, [])

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

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4"
            onMouseDown={handleBackdropMouseDown}
            onMouseUp={handleBackdropMouseUp}>
            <div className="bg-white rounded-2xl shadow-xl lg:w-7xl max-h-[90vh] overflow-y-auto p-3 lg:p-5">
                <div
                    className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-slate-900">Exercise</h2>
                    <button
                        onClick={handleClose}
                        disabled={loading}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        <X className="w-5 h-5 text-slate-600"/>
                    </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-8 gap-6 p-2">
                    <form onSubmit={handleAddResponse}
                          className="border-b lg:border-b-0 lg:border-r border-slate-200 lg:col-span-4 p-6">
                        <div className="space-y-5">
                            <p
                                className="w-full px-4 py-3 border border-slate-300 rounded-xl bg-slate-100 text-slate-700 outline-none transition-all font-bold break-all"
                            >
                                {exercise.request}
                            </p>
                            <label htmlFor="response" className="block text-sm font-semibold text-slate-700 mb-2">
                                Answer *
                            </label>
                            <textarea
                                id="response"
                                value={formData.response}
                                onChange={(e) => setFormData({...formData, response: e.target.value})}
                                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                placeholder="Enter your answer here..."
                                rows="4"
                                disabled={loading}
                            />
                            {isExercisedSolved && <p
                                className="w-full px-4 py-3 border border-slate-300 rounded-xl bg-slate-100 text-slate-700 outline-none transition-all font-bold break-all"
                            >
                                {exercise.response}
                            </p>}
                        </div>
                        <div className="flex gap-3 mt-8 w-full lg:w-[70%] mx-auto">
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
                                    <span>Send response</span>
                                )}
                            </button>
                        </div>
                    </form>
                    <div className="lg:col-span-4 rounded-2xl p-4 flex flex-col">
                        <h2 className="text-lg font-bold text-slate-900 mb-2">History</h2>
                        <div className="max-h-[30vh] min-w-[300px] w-[500px] overflow-y-auto mt-4">
                            {history && history.length > 0 ? history.map((item) => {
                                    return <div
                                        key={item.id}
                                        className="border border-slate-200 rounded-xl p-4 mb-3 bg-slate-50 cursor-pointer"
                                        onClick={() => setFormData((prev) => ({...prev, response: item.response}))}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                        <span
                                            className={`text-sm font-medium ${
                                                item.success ? 'text-green-600' : 'text-red-600'
                                            }`}
                                        >
                                            {item.success ? 'Success' : 'Failed'}
                                        </span>
                                            <span className="text-xs text-slate-400">
                                            {new Date(exercise.created_at).toLocaleDateString()}
                                        </span>
                                        </div>
                                        <p className="text-slate-900 font-mono break-all text-sm">
                                            {item.response}
                                        </p>
                                    </div>
                                })
                                : (
                                    <div
                                        className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
                                        <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4"/>
                                        <h2 className="text-slate-500 mb-4">
                                            You have not submitted any responses yet.
                                        </h2>

                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SolveExerciseModal;