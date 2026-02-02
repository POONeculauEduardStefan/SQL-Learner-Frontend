import React, {useState} from 'react';
import {DatabaseZap, Delete, Search} from "lucide-react";
import api from "../../../services/api.tsx";
import {getErrorResponseMessage, getSuccessData} from "../../../utils/responses.jsx";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";
import QueryResults from "../QueryResults.jsx";
import SchemaModal from "../Courses/SchemaModal.jsx";

const Practice = () => {
    const {t} = useTranslation();
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);
    const [isSchemaModalOpen, setIsSchemaModalOpen] = useState(false);
    const onCloseSchemaModal = () => {
        setIsSchemaModalOpen(false);
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!input) {
            toast.error(t('practice.query_required'));
            return;
        }
        setLoading(true);
        try {
            const response = await api.post("http://127.0.0.1:8000/api/v1/runner", {
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
                toast.success(t('laboratories.query_executed_success'));
            }
        } catch (error) {
            const message = getErrorResponseMessage(error);
            toast.error(t(`backend.${message}`) || t('error.query_execution_failed'));
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
            <div className="flex items-center gap-10">
                <div>
                    <h1 className="text-3xl font-bold mb-2"
                    >
                        {t('practice.title')}</h1>
                    <p className="text-slate-600 mb-6"
                    >
                        {t('practice.description')}
                    </p>
                </div>
                <button
                    onClick={() => setIsSchemaModalOpen(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <DatabaseZap className="w-5 h-5"/>
                </button>
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
                                placeholder={t('practice.sql_placeholder')}
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
                <QueryResults
                    columns={columns}
                    rows={rows}
                />
            </div>
            {isSchemaModalOpen && (
                <SchemaModal isOpen={isSchemaModalOpen} onClose={onCloseSchemaModal}/>
            )}
        </div>
    );
};

export default Practice;