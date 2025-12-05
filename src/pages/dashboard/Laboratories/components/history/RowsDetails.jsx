import React from 'react';

const RowsDetails = ({selectedHistoryItem}) => {

    const getTableColumns = (rows_samples) => {
        const columns = []
        rows_samples.forEach(row => {
                Object.keys(row).forEach(key => {
                    if (!columns.includes(key)) {
                        columns.push(key)
                    }
                })
            }
        )
        return columns
    }

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
                                    <table className="table-auto">
                                        <thead>
                                        <tr>
                                            {
                                                getTableColumns(selectedHistoryItem.result_details.missing_rows_sample).map((col, index) => (
                                                    <th key={index} className="py-2 border">{col}</th>
                                                ))
                                            }
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            selectedHistoryItem.result_details.missing_rows_sample.map((row, rowIndex) => (
                                                <tr key={rowIndex}>
                                                    {
                                                        getTableColumns(selectedHistoryItem.result_details.missing_rows_sample).map((col, colIndex) => (
                                                            <td key={colIndex} className="px-4 py-2 border">
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
                                    <table className="table-auto">
                                        <thead>
                                        <tr>
                                            {
                                                getTableColumns(selectedHistoryItem.result_details.extra_rows_sample).map((col, index) => (
                                                    <th key={index} className="py-2 border">{col}</th>
                                                ))
                                            }
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            selectedHistoryItem.result_details.extra_rows_sample.map((row, rowIndex) => (
                                                <tr key={rowIndex}>
                                                    {
                                                        getTableColumns(selectedHistoryItem.result_details.extra_rows_sample).map((col, colIndex) => (
                                                            <td key={colIndex} className="px-4 py-2 border">
                                                                {row[col] !== null ? row[col] : 'null'}
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