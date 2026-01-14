import React, {useEffect, useState} from 'react';
import api from "../../../../services/api.tsx";
import {getErrorResponseMessage, getSuccessData} from "../../../../utils/responses.jsx";
import {toast} from "react-toastify";
import ProfileReportStatusModal from "./ProfileReportStatusModal.jsx";
import ProfileReportCard from "./ProfileReportCard.jsx";
import {useTranslation} from "react-i18next";

const ProfileReportStatus = () => {
        const {t} = useTranslation();
        const [reports, setReports] = useState([]);
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [selectedReport, setSelectedReport] = useState(null);
        const loadReports = async () => {
            try {
                const response = await api.get("http://localhost:8000/api/v1/report/by-user", {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.status === 200) {
                    const data = getSuccessData(response).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                    setReports(data);
                }
            } catch (error) {
                const message = getErrorResponseMessage(error);
                toast.error(message);
            }
        }
        useEffect(() => {
            loadReports();
        }, []);
        return (
            <div
                className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-slate-200 p-3 sm:p-5 max-h-[500px] overflow-y-auto">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {t('report_history.title')}
                </h3>
                {reports.length === 0 ? (
                    <p className="text-gray-600">{t('report_history.no_reports')}</p>
                ) : (
                    <ul className="space-y-4 mt-1">
                        {reports.map((report, index) => (
                            <li key={index}
                                className="flex flex-col gap-1 p-4 bg-slate-50 rounded-lg shadow-lg text-xs
                                cursor-pointer hover:transform hover:scale-[1.02] transition-transform duration-200 ease-in-out"
                                onClick={() => {
                                    setSelectedReport(report);
                                    setIsModalOpen(true);
                                }}
                            >
                                <ProfileReportCard report={report}/>
                            </li>
                        ))}
                    </ul>
                )}
                {
                    selectedReport && (
                        <ProfileReportStatusModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            report={selectedReport}
                        />
                    )
                }
            </div>
        );
    }
;

export default ProfileReportStatus;