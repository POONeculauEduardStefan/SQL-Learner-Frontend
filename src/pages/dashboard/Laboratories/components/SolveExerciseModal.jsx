import React, {useEffect, useState} from 'react';
import {BookOpen, Loader2, X} from "lucide-react";
import api from "../../../../services/api.js";
import {getErrorResponseMessage, getSuccessData} from "../../../../utils/responses.jsx";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";
import QueryResults from "../../QueryResults.jsx";

const SolveExerciseModal = ({isOpen, onClose, exercise, fetchExercisesByLabId, laboratory}) => {
    const {t} = useTranslation();
    const [loading, setLoading] = useState(false);
    const [mouseDownTarget, setMouseDownTarget] = useState(null);
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);
    const [formData, setFormData] = useState({
        response: '',
    });
    const [history, setHistory] = useState([]);

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
                console.log(historyData);
                setHistory(historyData);
            }
        } catch (error) {
            const message = getErrorResponseMessage(error);
            toast.error(message);
        }
    }

    useEffect(() => {
        fetchHistory(exercise.id)
    }, [])

    const handleClose = () => {
        if (!loading) {
            onClose();
        }
    };

    const handleCancel = () => {
        if (!loading) {
            setColumns([]);
            setRows([]);
        }
    }

    const handleRunQuery = async (e) => {
        e.preventDefault()
        if (formData.response.trim() === '') {
            toast.error("Query cannot be empty.");
            return;
        }
        setLoading(true);
        try {
            const response = await api.post("http://localhost:8000/api/v1/runner", {
                query: formData.response
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.status === 200) {
                const data = getSuccessData(response);
                setColumns(data.columns);
                setRows(data.rows);
                toast.success('Query executed successfully');
                console.log('Query Result:', data);
            }
        } catch (error) {
            const message = getErrorResponseMessage(error);
            toast.error(message || 'Failed to execute query');
        } finally {
            setLoading(false);
        }
    }

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
            <div className="bg-white rounded-2xl shadow-xl lg:w-7xl max-h-[90vh] overflow-y-auto p-3 lg:p-5"
                 style={{scrollbarWidth: "none"}}
            >
                <div
                    className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-slate-900">{t('common.exercise')}</h2>
                    <button
                        onClick={handleClose}
                        disabled={loading}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        <X className="w-5 h-5 text-slate-600"/>
                    </button>
                </div>
                <div className="flex flex-col gap-6 mt-6">
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
                                    {t('common.answer')} *
                                </label>
                                <textarea
                                    id="response"
                                    value={formData.response}
                                    onChange={(e) => setFormData({...formData, response: e.target.value})}
                                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    placeholder={t('common.enter_answer')}
                                    rows="4"
                                    disabled={loading}
                                />
                            </div>
                            <div className="flex gap-3 justify-center items-center mt-8 w-full lg:w-[70%] mx-auto">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    disabled={loading}
                                    className="flex-1 h-12 px-2 py-3 bg-slate-100 text-sm hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
                                >
                                    {t('common.cancel')}
                                </button>
                                <button
                                    type="button"
                                    disabled={loading}
                                    onClick={handleRunQuery}
                                    className="flex-1 h-12 flex items-center justify-center gap-2 px-3 py-3 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin"/>
                                            <span>{t('common.save_loading')}</span>
                                        </>
                                    ) : (
                                        <span>{t('common.run_query')}</span>
                                    )}
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 h-12 flex items-center justify-center gap-2 px-3 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin"/>
                                            <span>{t('common.save_loading')}</span>
                                        </>
                                    ) : (
                                        <span>{t('common.send_response')}</span>
                                    )}
                                </button>
                            </div>
                        </form>
                        <div className="lg:col-span-4 rounded-2xl flex flex-col">
                            <h2 className="text-lg font-bold text-slate-900 mb-2">{t('common.history')}</h2>
                            <div className="max-h-[30vh] w-full overflow-y-auto mt-4"
                                style={{scrollbarWidth: "none"}}
                            >
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
                                            {item.success ? t('common.success') : t('common.failure')}
                                        </span>
                                                <span className="text-xs text-slate-400">
                                            {new Date(item.created_at).toLocaleDateString()}
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
                    <QueryResults
                        columns={columns}
                        rows={rows}
                    />
                </div>
            </div>
        </div>
    )
}

export default SolveExerciseModal;