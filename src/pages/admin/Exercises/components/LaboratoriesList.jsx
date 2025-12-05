import React from 'react';
import {ChevronRight} from 'lucide-react';

const LaboratoriesList = ({laboratories, selectedLab, setSelectedLabId}) => {
    return (
        <div className="space-y-2">
            {laboratories.map((lab) => (
                <div
                    key={lab.id}
                    className={`group relative rounded-xl transition-all ${
                        selectedLab === lab.id
                            ? 'bg-blue-50 border-2 border-blue-200'
                            : 'bg-slate-50 hover:bg-slate-100 border-2 border-transparent'
                    }`}
                >
                    <button
                        onClick={() => setSelectedLabId(lab.id)}
                        className="w-full text-left p-3"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                                <p className={`font-semibold text-sm truncate ${
                                    selectedLab === lab.id ? 'text-blue-900' : 'text-slate-900'
                                }`}>
                                    {lab.title}
                                </p>
                            </div>
                            <ChevronRight className={`w-4 h-4 flex-shrink-0 ml-2 ${
                                selectedLab === lab.id ? 'text-blue-600' : 'text-slate-400'
                            }`}/>
                        </div>
                    </button>
                </div>
            ))}
        </div>
    );
};

export default LaboratoriesList;
