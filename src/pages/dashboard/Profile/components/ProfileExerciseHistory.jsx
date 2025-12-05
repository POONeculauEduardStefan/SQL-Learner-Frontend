import React, {useEffect, useState} from 'react';
import api from "../../../../services/api.tsx";
import {getErrorResponseMessage, getSuccessData} from "../../../../utils/responses.jsx";
import {toast} from "react-toastify";
import ProfileExerciseHistoryCard from "./ProfileExerciseHistoryCard.jsx";

const ProfileExerciseHistory = () => {
        const [history, setHistory] = useState([]);
        // const [isModalOpen, setIsModalOpen] = useState(false);
        const [selectedHistory, setSelectedHistory] = useState(null);
        const loadHistory = async () => {
            try {
                const response = await api.get(`http://127.0.0.1:8000/api/v1/exercise_history/by-user`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.status === 200) {
                    const data = getSuccessData(response).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                    setHistory(data);
                }
            } catch (error) {
                const message = getErrorResponseMessage(error);
                toast.error(message);
            }
        }
        useEffect(() => {
            loadHistory();
        }, []);
        return (
            <div
                className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-slate-200 p-3 sm:p-5 max-h-[500px] overflow-y-auto">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Exercise History
                </h3>
                {history.length === 0 ? (
                    <p className="text-gray-600">No history found.</p>
                ) : (
                    <ul className="space-y-4 mt-1">
                        {history.map((history, index) => (
                            <li key={index}
                                className="flex flex-col gap-1 p-4 bg-slate-50 rounded-lg shadow-lg text-xs
                                cursor-pointer hover:transform hover:scale-[1.02] transition-transform duration-200 ease-in-out"
                                onClick={() => {
                                    setSelectedHistory(history);
                                    // setIsModalOpen(true);
                                }}
                            >
                                <ProfileExerciseHistoryCard history={history}/>
                            </li>
                        ))}
                    </ul>
                )}
                {/*{*/}
                {/*    selectedReport && (*/}
                {/*        <ProfileReportStatusModal*/}
                {/*            isOpen={isModalOpen}*/}
                {/*            onClose={() => setIsModalOpen(false)}*/}
                {/*            report={selectedReport}*/}
                {/*        />*/}
                {/*    )*/}
                {/*}*/}
            </div>
        );
    }
;

export default ProfileExerciseHistory;