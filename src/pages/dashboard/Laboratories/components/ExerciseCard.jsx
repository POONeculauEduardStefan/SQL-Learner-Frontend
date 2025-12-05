import React from 'react';
import {BadgeAlert, BadgeCheck, Bug, Calendar, CircleQuestionMark} from "lucide-react";

const ExerciseCard = ({
                          index,
                          exercise,
                          setSelectedExercise,
                          setIsViewExerciseOpen,
                          setIsSolveExerciseOpen,
                          setIsReportExerciseOpen
                      }) => {
    return (
        <div
            className="grid grid-cols-1 md:grid-cols-4 gap-3 justify-between bg-slate-50 rounded-xl p-4 hover:bg-blue-50"
            key={exercise.id}
            onClick={() => {
                setSelectedExercise(exercise);
            }}>
            <div
                className="md:col-span-3 border-b py-2 md:py-0  md:border-b-0 md:border-r border-slate-200 pr-4 flex-1">
                <span
                    className="text-sm font-medium text-blue-600 mb-2 block">{index + 1}. Question:</span>
                <p className="text-slate-900 font-mono text-xs break-all">
                    {exercise.request}
                </p>
                <p className="flex items-center gap-2 text-xs text-slate-400 mt-2">
                    <Calendar className="w-3 h-3"/> Added at: {new Date(exercise.created_at).toLocaleDateString()}
                </p>
                <div className="flex mt-4 ml-2 gap-2">
                    <button type="button"
                            onClick={() => setIsSolveExerciseOpen(true)}
                            className=" px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full hover:bg-green-200 transition-colors cursor-pointer">
                        Solve Exercise
                    </button>
                    <button type="button"
                            onClick={() => setIsViewExerciseOpen(true)}
                            className=" px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full hover:bg-blue-200 transition-colors cursor-pointer">
                        View History
                    </button>
                    {exercise.status.total_count ?
                        <button type="button"
                                onClick={() => setIsReportExerciseOpen(true)}
                                className=" px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full hover:bg-red-200 transition-colors cursor-pointer">
                            <Bug className="w-5 h-5"/>
                        </button> : null}
                </div>
            </div>
            <div className="md:col-span-1 text-sm">
                {exercise.status.total_count ? (
                    <div className="flex flex-col">
                        <p className="flex items-center gap-2 ">
                            Status:
                            <span
                                className={`font-semibold ${exercise.status.success_rate > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {exercise.status.success_rate > 0 ? <BadgeCheck className="w-5 h-5"/> :
                                <BadgeAlert className="w-5 h-5"/>}
                            </span>
                        </p>
                        <p className="mt-2  text-slate-500">
                            Success Rate: {exercise.status.success_rate}%
                        </p>
                        <p className="mt-2  text-slate-500">
                            Attempts: {exercise.status.total_count}
                        </p>
                    </div>
                ) : (
                    <span className="flex items-center gap-2 font-semibold text-slate-500">
                        <span>Not attempted</span> <CircleQuestionMark className="w-5 h-5"/>
                </span>
                )}
            </div>
        </div>
    );
};

export default ExerciseCard;
