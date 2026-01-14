import React from 'react';
import {Search} from "lucide-react";
import {useTranslation} from "react-i18next";

const ReportFilter = ({searchQuery, setSearchQuery, filterStatus, setFilterStatus}) => {
    const {t} = useTranslation();
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-3">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"/>
                    <input
                        type="text"
                        placeholder={t('reports_management.search_reports_placeholder')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                </div>

                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white">
                    <option value="all">All Status</option>
                    <option value="open">{t('common.open')}</option>
                    <option value="in_progress">{t('common.in_progress')}</option>
                    <option value="resolved">{t('common.resolved')}</option>
                </select>
            </div>
        </div>
    );
};

export default ReportFilter;