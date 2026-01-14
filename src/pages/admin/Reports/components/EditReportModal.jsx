import React, {useState} from 'react';
import {useTranslation} from "react-i18next";

const EditReportModal = ({
                             isOpen,
                             onClose,
                             statusFormData,
                             setStatusFormData,
                             handleUpdateReport
                         }) => {
    const {t} = useTranslation();
    const [mouseDownTarget, setMouseDownTarget] = useState(null);
    const handleBackdropMouseDown = (e) => {
        setMouseDownTarget(e.target);
    };

    const handleBackdropMouseUp = (e) => {
        if (mouseDownTarget === e.currentTarget && e.target === e.currentTarget) {
            onClose();
        }
        setMouseDownTarget(null);
    };
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4"
             onMouseDown={handleBackdropMouseDown}
             onMouseUp={handleBackdropMouseUp}>
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('reports_management.update_report_status')}</h2>

                <div className="space-y-5">
                    <div>
                        <label htmlFor="status" className="block text-sm font-semibold text-slate-700 mb-2">
                            Status *
                        </label>
                        <select
                            id="status"
                            value={statusFormData.status}
                            onChange={(e) => setStatusFormData({...statusFormData, status: e.target.value})}
                            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                        >
                            <option value="open">{t('common.open')}</option>
                            <option value="in_progress">{t('common.in_progress')}</option>
                            <option value="resolved">{t('common.resolved')}</option>
                        </select>
                    </div>

                    {statusFormData.status === 'resolved' && (
                        <div>
                            <label htmlFor="notes" className="block text-sm font-semibold text-slate-700 mb-2">
                                Resolution Notes
                            </label>
                            <textarea
                                id="notes"
                                value={statusFormData.solution}
                                onChange={(e) => setStatusFormData({
                                    ...statusFormData,
                                    solution: e.target.value
                                })}
                                rows={4}
                                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                                placeholder="Describe how this report was resolved..."
                            />
                        </div>
                    )}
                </div>

                <div className="flex gap-3 mt-8">
                    <button
                        onClick={() => onClose()}
                        className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors cursor-pointer"
                    >
                        {t('common.cancel')}
                    </button>
                    <button
                        onClick={handleUpdateReport}
                        className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors cursor-pointer"
                    >
                        {t('common.update')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditReportModal;