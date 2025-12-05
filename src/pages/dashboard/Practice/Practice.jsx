import React, {useState} from 'react';
import {BookOpen, Delete, Search} from "lucide-react";
import api from "../../../services/api.tsx";
import {getErrorResponseMessage, getSuccessData} from "../../../utils/responses.jsx";
import {toast} from "react-toastify";

const Practice = () => {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!input) {
            toast.error('Please enter a query');
            return;
        }
        setLoading(true);
        try {
            const response = await api.post("http://localhost:8000/api/v1/runner", {
                query: input
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.status === 200) {
                const data = getSuccessData(response);
                setColumns(data.columns);
                setRows(data.rows);
                toast.success('Query executed successfully');
                console.log('Query Result:', data);
            }
        } catch (error) {
            const message = getErrorResponseMessage(error);
            toast.error(message || 'Failed to execute query');
        } finally {
            setLoading(false);
        }
    }

    const handleClear = () => {
        setInput('');
        setColumns([]);
        setRows([]);
    }

    return (
        <div className="mt-6 w-[90%] mx-auto">
            <div>
                <h1 className="text-3xl font-bold mb-2"
                >
                    SQL Practice</h1>
                <p className="text-slate-600 mb-6"
                >
                    Practice your SQL skills with interactive exercises and challenges.
                </p>
            </div>
            <div className="flex flex-col gap-10">
                <form className="flex flex-col gap-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
                      onSubmit={handleSubmit}
                >
                    <div className="bg-gray-900 dark:bg-black p-4 rounded-md shadow-inner">
                        <div className="flex">
                            <span className="text-green-400 font-mono text-base mr-2 mt-2 select-none">SQL&gt;</span>
                            <textarea
                                className="flex-1 bg-transparent text-white dark:text-gray-200 font-mono text-base p-2 rounded-none focus:outline-none focus:ring-0"
                                rows="4"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your SQL query here..."
                                spellCheck="false"
                                autoCapitalize="none"
                                autoCorrect="off"
                            />
                        </div>
                    </div>
                    <div className="flex gap-5 justify-end">
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            disabled={loading}
                            className="flex justify-center border-1 w-12 h-10 p-2 rounded-xl border-slate-300 hover:ring-2 hover:ring-blue-500 hover:border-transparent outline-none transition-all cursor-pointer"
                        >
                            <Search className="w-5 h-5 text-slate-400"/>
                        </button>
                        <button
                            type="button"
                            onClick={handleClear}
                            disabled={loading}
                            className="flex justify-center border-1 w-12 h-10 p-2 border-slate-300 rounded-xl hover:ring-2 hover:ring-red-500 hover:border-transparent outline-none transition-all cursor-pointer"
                        >
                            <Delete className="w-5 h-5 text-red-600"/>
                        </button>
                    </div>
                </form>
                {columns.length > 0 && rows.length > 0 ?
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-5">
                        <div className="overflow-x-auto min-h-[420px]">
                            <table className="w-full">
                                <thead>
                                <tr className="border-b border-slate-200 bg-slate-50">
                                    {columns.map((col, index) => (
                                        <th className={`text-left px-2 py-4 text-sm font-semibold text-slate-700 ${index % 2 === 0 ? 'bg-slate-100' : 'bg-white'}`}
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
                            No results to display
                        </h2>
                    </div>
                }
            </div>
        </div>
    );
};

export default Practice;