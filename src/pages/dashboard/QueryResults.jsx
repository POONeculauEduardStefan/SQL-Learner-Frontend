import React from 'react';
import {BookOpen} from "lucide-react";
import {useTranslation} from "react-i18next";

const QueryResults = ({columns, rows}) => {
    const {t} = useTranslation();
    return (
        <>
            {
                columns.length > 0 && rows.length > 0 ?
                    <div
                        className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-5 max-h-[400px] overflow-y-auto"
                        style={{scrollbarWidth: "none"}}
                    >
                        <div className="overflow-x-auto min-h-[420px]">
                            <table className="w-full">
                                <thead>
                                <tr className="border-b border-slate-200 bg-slate-50">
                                    {columns.map((col, index) => (
                                        <th className={`text-left px-2 py-4 text-sm font-semibold text-white ${index % 2 === 0 ? 'bg-slate-600' : 'bg-gray-500'}`}
                                            key={index}>{col}</th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody>
                                {rows.map((row, rowIndex) => (
                                    <tr className="border-b border-slate-300 last:border-b-0 hover:bg-slate-50 transition-colors"
                                        key={rowIndex}>
                                        {columns.map((col, colIndex) => (
                                            <td className={`text-left px-2 py-4 text-sm font-semibold text-slate-700 ${colIndex % 2 === 0 ? 'bg-slate-100' : 'bg-white'}`}
                                                key={colIndex}>{row[col] || 'null'}</td>
                                        ))}
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    :
                    <div
                        className="flex flex-col h-[450px] items-center justify-center bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
                        <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4"/>
                        <h2 className="text-slate-500 mb-4">
                            {t('common.no_results_display')}
                        </h2>
                    </div>
            }
        </>
    );
};

export default QueryResults;