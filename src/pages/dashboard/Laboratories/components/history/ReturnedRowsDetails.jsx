import React from 'react';
import {useTranslation} from "react-i18next";

const ReturnedRowsDetails = ({selectedHistoryItem}) => {
    const {t} = useTranslation();
    return (
        <div
            className="w-full border border-slate-300 rounded-2xl bg-slate-50 text-slate-700 max-h-[400px] overflow-y-auto"
            style={{scrollbarWidth: "none"}}
        >
            {
                selectedHistoryItem.result_details.rows ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                            <tr className="border-b border-slate-200 bg-slate-50">
                                {
                                    selectedHistoryItem.result_details.columns.map((col, index) => (
                                        <th key={index}
                                            className={`text-left px-2 py-3 text-sm font-semibold text-white ${index % 2 === 0 ? 'bg-slate-600' : 'bg-gray-500'}`}>{col}</th>
                                    ))
                                }
                            </tr>
                            </thead>
                            <tbody>
                            {
                                selectedHistoryItem.result_details.rows.map((row, rowIndex) => (
                                    <tr key={rowIndex}
                                        className="border-b border-slate-300 last:border-b-0 hover:bg-slate-50 transition-colors"
                                    >
                                        {
                                            selectedHistoryItem.result_details.columns.map((col, colIndex) => (
                                                <td key={colIndex}
                                                    className={`text-left px-2 py-3 text-sm font-semibold text-slate-700 ${colIndex % 2 === 0 ? 'bg-slate-100' : 'bg-white'}`}>
                                                    {row[col] !== undefined ? row[col] : 'N/A'}
                                                </td>
                                            ))
                                        }
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-green-600 font-semibold p-2">{t('common.all_data_is_present')}</p>
                )
            }
        </div>
    );
};

export default ReturnedRowsDetails;