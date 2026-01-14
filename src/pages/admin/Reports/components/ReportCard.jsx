import React from 'react';
import {Calendar, ChevronDown, Edit2, Eye, Trash2, User} from "lucide-react";
import ExpandedReportCard from "./ExpandedReportCard.jsx";
import {getStatusColor, getStatusIcon} from "../../../../utils/statusIcon.jsx";
import {useTranslation} from "react-i18next";

const ReportCard = ({
                        report,
                        setExpandedReportId,
                        expandedReportId,
                        setSelectedReport,
                        setStatusFormData,
                        setShowStatusModal,
                        setIsDeleteReportOpen,
                        setSelectedReportId
                    }) => {
    const {t} = useTranslation();
    return (
        <div
            key={report.id}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
            <div
                className="p-6">
                <div className="flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-slate-900 truncate">{report.title}</h3>
                            <div className="flex items-center gap-2">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${getStatusColor(report.status)}`}>
                                                  {getStatusIcon(report.status)}
                                                    {report.status}
                                                </span>
                            </div>
                        </div>
                        <p className="text-sm text-slate-600 mb-3">{t('common.exercise_id')}: {report.exercise_id}</p>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                                          <span className="inline-flex items-center gap-1.5">
                                            <User className="w-3.5 h-3.5"/>
                                              {report.added_by_email}
                                          </span>
                            <span className="inline-flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5"/>
                                {new Date(report.created_at).toLocaleDateString()}
                                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center gap-2 flex-shrink-0">
                        {
                            <button
                                onClick={() => setExpandedReportId(expandedReportId === report.id ? null : report.id)}
                                className="p-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors cursor-pointer">
                                <Eye className="w-4 h-4"/>
                            </button>
                        }
                        {<button
                            onClick={() => {
                                setSelectedReport(report);
                                setStatusFormData({
                                    status: report.status,
                                    solution: report.solution || ''
                                });
                                setShowStatusModal(true);
                            }}
                            className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors cursor-pointer">
                            <Edit2 className="w-4 h-4"/>
                        </button>}
                        <button
                            onClick={() => {
                                setIsDeleteReportOpen(true)
                                setSelectedReportId(report.id)
                            }}
                            className="p-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors cursor-pointer">
                            <Trash2 className="w-4 h-4"/>
                        </button>
                        <ChevronDown
                            onClick={() => setExpandedReportId(expandedReportId === report.id ? null : report.id)}
                            className={`w-5 h-5 text-slate-400 transition-transform ${expandedReportId === report.id ? 'rotate-180' : ''} cursor-pointer`}/>
                    </div>
                </div>
            </div>

            {expandedReportId === report.id && (
                <ExpandedReportCard
                    report={report}
                    setSelectedReport={setSelectedReport}
                    setStatusFormData={setStatusFormData}
                    setShowStatusModal={setShowStatusModal}
                />
            )}
        </div>
    );
};

export default ReportCard;