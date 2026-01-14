import React, {useState} from 'react';
import {X} from 'lucide-react';
import {getStatusColor, getStatusIcon} from "../../../../utils/statusIcon.jsx";
import {useTranslation} from "react-i18next";

export default function ProfileReportStatusModal({isOpen, onClose, report}) {
    const {t} = useTranslation();
    const [mouseDownTarget, setMouseDownTarget] = useState(null);


    const handleClose = () => {
        onClose();
    };

    const handleBackdropMouseDown = (e) => {
        setMouseDownTarget(e.target);
    };

    const handleBackdropMouseUp = (e) => {
        if (mouseDownTarget === e.currentTarget && e.target === e.currentTarget) {
            handleClose();
        }
        setMouseDownTarget(null);
    };

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4"
             onMouseDown={handleBackdropMouseDown}
             onMouseUp={handleBackdropMouseUp}>
            <div className="bg-white rounded-2xl shadow-xl max-w-[80%] w-full max-h-[90vh] overflow-y-auto">
                <div
                    className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-lg"><span className="font-bold text-slate-900">{t('common.report')}:</span> {report.title}
                    </h2>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        <X className="w-5 h-5 text-slate-600"/>
                    </button>
                </div>
                <div className="space-y-4">
                    <div className="flex gap-3 flex-col border-b border-slate-200 p-6">
                        <p className="text-gray-700 flex items-center gap-5">
                            <strong>Status:</strong>
                            <span
                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${getStatusColor(report.status)}`}>
                            {getStatusIcon(report.status)}
                                {report.status.replace('_', ' ')}
                        </span>
                        </p>
                        <p
                            className="w-full px-4 py-3 border border-slate-300 rounded-xl bg-slate-100 text-slate-700 outline-none transition-all font-bold break-all max-h-[200px] overflow-y-auto"
                            style={{scrollbarWidth: "none"}}
                        >
                            {report.request}
                        </p>
                    </div>
                    <div className="flex flex-col p-6 gap-2">
                        <p className="text-black-600 font-bold">
                            {t('common.submitted_on')}: <span
                            className="font-normal">{new Date(report.created_at).toLocaleDateString()}</span>
                        </p>
                        {report.updated_at && <p className="text-black-600 font-bold">
                            {t('common.updated_on')}: <span
                            className="font-normal">{new Date(report.updated_at).toLocaleDateString()}</span>
                        </p>}
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">{t('common.report_details')}</h3>
                            <p className="text-gray-700 whitespace-pre-wrap">{report.solution || t('error.no_additional_details_provided')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}