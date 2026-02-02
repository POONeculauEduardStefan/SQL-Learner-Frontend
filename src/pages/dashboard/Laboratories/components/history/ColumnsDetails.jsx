import React from 'react';
import {useTranslation} from "react-i18next";

const ColumnsDetails = ({selectedHistoryItem}) => {
    const {t} = useTranslation();
    return (
        <>
            {selectedHistoryItem && selectedHistoryItem.result_details.type === 'column' && (
                <div className="mt-4 overflow-y-auto">
                    <div
                        className="w-full text-sm px-2 py-2 border border-slate-300 rounded-xl bg-slate-50 text-slate-700 outline-none transition-all font-mono break-all">
                        {
                            selectedHistoryItem.result_details.missing_columns ? (
                                <div className="flex flex-col gap-5">
                                    <div>
                                        {selectedHistoryItem.result_details.missing_columns && selectedHistoryItem.result_details.missing_columns.length > 0 && (
                                            <div className="flex flex-col">
                                                <p className="font-semibold text-red-600 mb-2">{t('common.missing_columns')}:</p>
                                                <div
                                                    className="flex flex-row overflow-x-auto gap-3"
                                                >
                                                    {selectedHistoryItem.result_details.missing_columns.map((col, index) => (
                                                        <div
                                                            className="bg-red-400 rounded-2xl py-3 px-5 text-white font-mono whitespace-nowrap"
                                                            key={index}>{col}</div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        {selectedHistoryItem.result_details.extra_columns && selectedHistoryItem.result_details.extra_columns.length > 0 &&
                                            <div className="flex flex-col">
                                                <p className="font-semibold text-yellow-600 mb-2">{t('common.extra_columns')}:</p>
                                                <div
                                                    className="flex flex-row overflow-x-auto gap-3"
                                                >
                                                    {
                                                        selectedHistoryItem.result_details.extra_columns.map((col, index) => (
                                                            <div
                                                                className="bg-yellow-400 rounded-2xl py-3 px-5 text-white font-mono whitespace-nowrap"
                                                                key={index}>{col}
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            ) : (
                                <p className="text-green-600 font-semibold">All columns are
                                    correct.</p>
                            )
                        }
                    </div>
                </div>
            )}
        </>
    );
};

export default ColumnsDetails;