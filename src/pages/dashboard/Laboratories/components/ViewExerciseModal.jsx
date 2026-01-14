import React, {useEffect, useState} from 'react';
import {BadgeCheck, BookOpen, X} from "lucide-react";
import api from "../../../../services/api.js";
import {getErrorResponseMessage, getSuccessData} from "../../../../utils/responses.jsx";
import {toast} from "react-toastify";
import ColumnsDetails from "./history/ColumnsDetails.jsx";
import RowsDetails from "./history/RowsDetails.jsx";
import HistoryList from "./history/HistoryList.jsx";
import {useTranslation} from "react-i18next";
import ReturnedRowsDetails from "./history/ReturnedRowsDetails.jsx";

const ViewExerciseModal = ({isOpen, onClose, exercise}) => {
    const {t} = useTranslation();
    const [loading, setLoading] = useState(false);
    const [mouseDownTarget, setMouseDownTarget] = useState(null);
    const [history, setHistory] = useState([]);
    const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);


    const fetchHistory = async (exerciseId) => {
        setLoading(true);
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
        } finally {
            setLoading(false);
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
            className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50"
            onMouseDown={handleBackdropMouseDown}
            onMouseUp={handleBackdropMouseUp}>
            <div
                className="bg-white p-2 rounded-2xl shadow-xl w-[90%] max-h-[90vh] min-h-[70vh] overflow-y-auto lg:p-5">
                <div
                    className="bg-white border-b border-slate-200 px-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-slate-900">{t('common.history')}</h2>
                    <button
                        onClick={handleClose}
                        disabled={loading}
                        className="hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        <X className="w-5 h-5 text-slate-600"/>
                    </button>
                </div>
                <div className="flex flex-col py-1">
                    <div className="flex flex-col w-full">
                        <div className="rounded-2xl px-2 py-2 flex flex-col">
                            <div className="flex w-full gap-3 overflow-x-auto"
                            >
                                <HistoryList
                                    history={history}
                                    setSelectedHistoryItem={setSelectedHistoryItem}/>
                            </div>
                        </div>
                        <div className="flex flex-col p-4">
                            <h3 className="text-base font-bold text-slate-900">{t('common.history_details')}</h3>
                            {selectedHistoryItem ? (
                                    <div className="mt-2 h-[400px]">
                                        <p
                                            className="w-full text-sm px-2 py-2 border border-slate-300 rounded-xl bg-slate-100 text-slate-700 outline-none transition-all font-mono break-all max-h-[100px] overflow-y-auto"
                                            style={{scrollbarWidth: "none"}}
                                        >
                                            {selectedHistoryItem.response}
                                        </p>
                                        {
                                            !selectedHistoryItem.success &&
                                            <p
                                                className={`mt-4 text-sm font-medium ${selectedHistoryItem.success ? 'text-green-600' : 'text-red-600'}`}
                                            >
                                                {selectedHistoryItem.result_details.message}
                                            </p>
                                        }
                                        {selectedHistoryItem && selectedHistoryItem.success && (
                                            <div className="mt-4 border-t border-slate-200 py-4">
                                                <p
                                                    className="mt-4 text-sm font-medium text-slate-700"
                                                >{t('common.rows_returned')}:
                                                    <span
                                                        className="font-semibold text-green-600 ml-1">
                                                        {selectedHistoryItem.result_details.rows_count}
                                                    </span>
                                                </p>
                                                <p
                                                    className="mt-2 text-sm font-medium text-slate-700"
                                                >{t('common.columns_returned')}:
                                                    <span
                                                        className="font-semibold text-green-600 ml-1"
                                                    >
                                                        {selectedHistoryItem.result_details.columns_count}
                                                    </span>
                                                </p>
                                                {/*<div className=" pt-4 flex flex-col items-center">*/}
                                                {/*    <p className="font-semibold text-green-600 mb-2">The query was*/}
                                                {/*        successful!</p>*/}
                                                {/*    <BadgeCheck*/}
                                                {/*        className="w-12 h-12 text-green-600 mx-auto"/>*/}
                                                {/*</div>*/}
                                            </div>
                                        )}
                                        {selectedHistoryItem.success === true &&
                                            <ReturnedRowsDetails selectedHistoryItem={selectedHistoryItem}/>}
                                        {selectedHistoryItem.success === false &&
                                            <RowsDetails selectedHistoryItem={selectedHistoryItem}/>}
                                        {selectedHistoryItem.success === false &&
                                            <ColumnsDetails selectedHistoryItem={selectedHistoryItem}/>}
                                    </div>
                                )
                                : (
                                    <div
                                        className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center  flex flex-col items-center justify-center  h-[400px]">
                                        <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4"/>
                                        <h2 className="text-slate-500 mb-4">
                                            {t('common.select_history')}
                                        </h2>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewExerciseModal;
