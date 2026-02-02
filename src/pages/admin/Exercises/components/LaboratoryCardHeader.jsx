import React from 'react';
import {Brain, Delete, Edit, Plus, Search, Trash2} from "lucide-react";
import {useTranslation} from "react-i18next";

const LaboratoryCardHeader = ({
                                  selectedLab,
                                  setIsEditLaboratoryOpen,
                                  setIsDeleteLaboratoryOpen,
                                  setShowExerciseModal,
                                  setShowGenerateModal,
                                  searchQuery,
                                  setSearchQuery,
                                  clearSearch
                              }) => {
    const {t} = useTranslation();
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">{selectedLab.title}</h2>
                </div>
                <div className="flex gap-5">
                    <button
                        onClick={() => setIsEditLaboratoryOpen(true)}
                        className="text-blue-600 rounded-lg hover:bg-blue-50 p-2 transition-colors cursor-pointer"
                    >
                        <Edit className="w-5 h-5"/>
                    </button>
                    <button
                        onClick={() => setIsDeleteLaboratoryOpen(true)}
                        className="text-red-600 rounded-lg hover:bg-red-50 p-2 transition-colors cursor-pointer"
                    >
                        <Trash2 className="w-5 h-5"/>
                    </button>
                    <button
                        onClick={() => setShowGenerateModal(true)}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl transition-colors shadow-lg shadow-blue-500/25 flex-shrink-0 cursor-pointer"
                    >
                        <Brain className="w-4 h-4"/>
                    </button>
                    <button
                        onClick={() => setShowExerciseModal(true)}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl transition-colors shadow-lg shadow-blue-500/25 flex-shrink-0 cursor-pointer"
                    >
                        <Plus className="w-4 h-4"/>
                        <span className="hidden sm:inline">{t('exercise_management.add_exercise')}</span>
                    </button>
                </div>
            </div>

            <div className="flex flex-row items-center justify-center gap-3 mt-6">
                <div className="flex-1 relative">
                    <Search
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"/>
                    <input
                        type="text"
                        placeholder={t('exercise_management.search_exercises_placeholder')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                </div>
                <button
                    onClick={clearSearch}
                    className="border-1 p-2 border-slate-300 rounded-xl hover:ring-2 hover:ring-red-500 hover:border-transparent outline-none transition-all cursor-pointer"
                >
                    <Delete className="w-5 h-5 text-red-600"/>
                </button>
            </div>
        </div>
    );
};

export default LaboratoryCardHeader;