import React, {useState} from 'react';
import {Eye, Trash2} from "lucide-react";
import DeleteEntityModal from "../../../DeleteEntityModal.jsx";

const ExerciseCard = ({
                          index, exercise, handleOpenEdit, handleDeleteExercise
                      }) => {

    const [isDeleteExerciseOpen, setIsDeleteExerciseOpen] = useState(false);

    return (
        <div
            key={exercise.id}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-all"
        >
            <div className="flex items-start justify-between mb-1 min-h-[50px]">
                <p className="text-md font-bold text-slate-900 flex-1 pr-2 mb-4 line-clamp-2">
                    {index + 1}. {' '}
                    {
                        exercise.request.length > 100
                            ? exercise.request.substring(0, 100) + '...'
                            : exercise.request
                    }</p>
            </div>
            <p className="text-xs text-slate-400 mb-2 line-clamp-3">
                Exercise ID: {exercise.id}
            </p>
            {
                exercise.created_at && (
                    <p className="text-xs text-slate-400 mb-2">Created
                        at: {new Date(exercise.created_at).toLocaleDateString()}</p>
                )
            }
            {
                exercise.updated_at && (
                    <p className="text-xs text-slate-400 mb-2">Updated
                        at: {new Date(exercise.updated_at).toLocaleDateString()}</p>
                )
            }


            <div className="flex items-center gap-2">
                <button
                    className="flex-1 flex items-center justify-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium px-3 py-2 rounded-lg transition-colors text-sm cursor-pointer"
                    onClick={() => handleOpenEdit(exercise)}
                >
                    <Eye className="w-3.5 h-3.5"/>
                    <span>View/Edit</span>
                </button>
                <button
                    onClick={() => setIsDeleteExerciseOpen(true)}
                    className="p-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors cursor-pointer"
                >
                    <Trash2 className="w-3.5 h-3.5"/>
                </button>
            </div>
            <DeleteEntityModal
                isOpen={isDeleteExerciseOpen}
                onClose={() => setIsDeleteExerciseOpen(false)}
                deleteEntity={handleDeleteExercise}
                entityId={exercise.id}
                entityName={"Exercise"}
            />
        </div>
    );
};

export default ExerciseCard;
