import React from 'react';

const ReportStats = ({stats}) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <p className="text-sm text-slate-600 mb-1">Total Reports</p>
                <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <p className="text-sm text-slate-600 mb-1">Open</p>
                <p className="text-3xl font-bold text-red-600">{stats.open}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <p className="text-sm text-slate-600 mb-1">In Progress</p>
                <p className="text-3xl font-bold text-amber-600">{stats.in_progress}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <p className="text-sm text-slate-600 mb-1">Resolved</p>
                <p className="text-3xl font-bold text-green-600">{stats.resolved}</p>
            </div>
        </div>
    );
};

export default ReportStats;