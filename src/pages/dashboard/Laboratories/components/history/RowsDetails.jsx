import React from 'react';

const RowsDetails = ({selectedHistoryItem}) => {

    return (
        <>
            {selectedHistoryItem && selectedHistoryItem.result_details.type === 'row' && (
                <div className="mt-4 space-y-4 overflow-y-auto"
                     style={{scrollbarWidth: "none"}}
                >
                    <div
                        className="w-full text-xs px-4 py-2 border border-slate-300 rounded-xl bg-slate-50 text-slate-700 overflow-y-auto"
                        style={{scrollbarWidth: "none"}}
                    >
                        {
                            selectedHistoryItem.result_details.missing_rows_sample ? (
                                <div>
                                    <p className="font-semibold text-red-600 mb-2">Missing Rows
                                        Sample:</p>
                                    <p className="text-xs mb-2">Count:
                                        <span className="font-semibold text-red-600">
                                            {selectedHistoryItem.result_details.missing_rows_count}
                                        </span>
                                    </p>
                                    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm max-h-[400px] overflow-y-auto overflow-x-auto"
                                    style={{
                                        scrollbarWidth: "none"
                                    }}
                                    >
                                        <table className="w-full">
                                            <thead>
                                            <tr
                                                className="border-b border-slate-200 bg-slate-50"
                                            >
                                                {
                                                    selectedHistoryItem.result_details.columns.map((col, index) => (
                                                        <th key={index}
                                                            className={`py-2 text-sm font-semibold text-white ${index % 2 === 0 ? 'bg-slate-600' : 'bg-gray-500'}`}>{col}</th>
                                                    ))
                                                }
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                selectedHistoryItem.result_details.missing_rows_sample.map((row, rowIndex) => (
                                                    <tr key={rowIndex}
                                                        className="border-b border-slate-300 last:border-b-0 hover:bg-slate-50 transition-colors"
                                                    >
                                                        {
                                                            selectedHistoryItem.result_details.columns.map((col, colIndex) => (
                                                                <td key={colIndex}
                                                                    className={`text-left px-2 py-4 text-sm font-semibold text-slate-700 ${colIndex % 2 === 0 ? 'bg-slate-100' : 'bg-white'}`}>
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
                                </div>
                            ) : (
                                <p className="text-green-600 font-semibold">No missing rows. All
                                    data is present.</p>
                            )
                        }
                    </div>
                    <div
                        className="w-full text-xs px-4 py-2 border border-slate-300 rounded-xl bg-slate-50 text-slate-700 overflow-y-auto mb-4"
                        style={{scrollbarWidth: "none"}}
                    >
                        {
                            selectedHistoryItem.result_details.extra_rows_sample ? (
                                <div>
                                    <p className="font-semibold text-red-600 mb-2">Extra Rows
                                        Sample:</p>
                                    <p className="text-xs mb-2">Count:
                                        <span className="font-semibold text-red-600">
                                            {selectedHistoryItem.result_details.extra_rows_count}
                                        </span>
                                    </p>
                                    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm max-h-[400px] overflow-y-auto  overflow-x-auto"
                                    style={{scrollbarWidth: "none"}}
                                    >
                                        <table className="w-full">
                                            <thead>
                                            <tr>
                                                {
                                                    selectedHistoryItem.result_details.columns.map((col, index) => (
                                                        <th key={index}
                                                            className={`py-2 text-sm font-semibold text-white ${index % 2 === 0 ? 'bg-slate-600' : 'bg-gray-500'}`}>{col}</th>
                                                    ))
                                                }
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                selectedHistoryItem.result_details.extra_rows_sample.map((row, rowIndex) => (
                                                    <tr key={rowIndex}
                                                        className="border-b border-slate-300 last:border-b-0 hover:bg-slate-50 transition-colors"
                                                    >
                                                        {
                                                            selectedHistoryItem.result_details.columns.map((col, colIndex) => (
                                                                <td key={colIndex}
                                                                    className={`text-left px-2 py-4 text-sm font-semibold text-slate-700 ${colIndex % 2 === 0 ? 'bg-slate-100' : 'bg-white'}`}>
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
                                </div>
                            ) : (
                                <p className="text-green-600 font-semibold">No missing rows. All
                                    data is present.</p>
                            )
                        }
                    </div>
                </div>
            )}
        </>
    );
};

export default RowsDetails;