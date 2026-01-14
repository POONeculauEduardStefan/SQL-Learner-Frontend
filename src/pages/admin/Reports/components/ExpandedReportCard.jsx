import React from 'react';
import {useTranslation} from "react-i18next";

const ExpandedReportCard = ({report, setSelectedReport,setStatusFormData,setShowStatusModal}) => {
    const {t} = useTranslation();
    return (
        <div className="border-t border-slate-200 bg-slate-50 p-6">
            <div className="space-y-6">
                <div>
                    <h4 className="text-sm font-semibold text-slate-700 mb-2">{t('common.full_description')}</h4>
                    <p className="text-slate-600 whitespace-pre-wrap">{report.request}</p>
                </div>

                {report.status === 'resolved' && (
                    <div>
                        <h4 className="text-sm font-semibold text-slate-700 mb-2">{t('common.resolution')}</h4>
                        <div
                            className="bg-white rounded-lg p-4 border border-slate-200 space-y-3">
                            <div>
                                <p className="text-xs text-slate-500 mb-1">{t('common.updated_by')}</p>
                                <p className="font-medium text-slate-900">{report.updated_by_email}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 mb-1">{t('common.updated_at')}</p>
                                <p className="text-xs font-small text-slate-900">
                                    {report.updated_at ? new Date(report.updated_at).toLocaleString() : 'N/A'}
                                </p>
                            </div>
                            {report.solution && (
                                <div>
                                    <p className="text-xs text-slate-500 mb-1">{t('common.resolution_notes')}</p>
                                    <p className="text-xs text-slate-600 whitespace-pre-wrap">{report.solution}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className="pt-4 border-t border-slate-200">
                    <p className="text-xs text-slate-500 mb-3">{t('common.quick_actions')}</p>
                    <div className="flex gap-2">
                        {report.status !== 'open' && (
                            <button
                                onClick={() => {
                                    setSelectedReport(report);
                                    setStatusFormData({status: 'open', solution: ''});
                                    setShowStatusModal(true);
                                }}
                                className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-lg transition-colors text-sm cursor-pointer">
                                {t('common.mark_open')}
                            </button>
                        )}
                        {report.status !== 'in_progress' && (
                            <button
                                onClick={() => {
                                    setSelectedReport(report);
                                    setStatusFormData({
                                        status: 'in_progress',
                                        solution: ''
                                    });
                                    setShowStatusModal(true);
                                }}
                                className="px-3 py-2 bg-amber-100 hover:bg-amber-200 text-amber-700 font-medium rounded-lg transition-colors text-sm cursor-pointer">
                                {t('common.mark_in_progress')}
                            </button>
                        )}
                        {report.status !== 'resolved' && (
                            <button
                                onClick={() => {
                                    setSelectedReport(report);
                                    setStatusFormData({
                                        status: 'resolved',
                                        solution: ''
                                    });
                                    setShowStatusModal(true);
                                }}
                                className="px-3 py-2 bg-green-100 hover:bg-green-200 text-green-700 font-medium rounded-lg transition-colors text-sm cursor-pointer"
                            >
                                {t('common.mark_resolved')}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpandedReportCard;