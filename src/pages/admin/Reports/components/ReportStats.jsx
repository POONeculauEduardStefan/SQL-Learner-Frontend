import React from 'react';
import {useTranslation} from "react-i18next";

const ReportStats = ({stats}) => {
    const {t} = useTranslation();
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <p className="text-sm text-slate-600 mb-1">{t('reports_management.total_reports')}</p>
                <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <p className="text-sm text-slate-600 mb-1">{t('common.open')}</p>
                <p className="text-3xl font-bold text-red-600">{stats.open}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <p className="text-sm text-slate-600 mb-1">{t('common.in_progress')}</p>
                <p className="text-3xl font-bold text-amber-600">{stats.in_progress}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <p className="text-sm text-slate-600 mb-1">{t('common.resolved')}</p>
                <p className="text-3xl font-bold text-green-600">{stats.resolved}</p>
            </div>
        </div>
    );
};

export default ReportStats;