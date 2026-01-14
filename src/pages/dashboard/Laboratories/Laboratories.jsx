import React, {useEffect, useState} from 'react';
import {BookOpen, DatabaseZap} from "lucide-react";
import ViewExerciseModal from "./components/ViewExerciseModal.jsx";
import api from "../../../services/api.js";
import {getErrorResponseMessage, getSuccessData} from "../../../utils/responses.jsx";
import {toast} from "react-toastify";
import ExerciseCard from "./components/ExerciseCard.jsx";
import LaboratoriesList from "./components/LaboratoriesList.jsx";
import SolveExerciseModal from "./components/SolveExerciseModal.jsx";
import ReportExerciseModal from "./components/ReportExerciseModal.jsx";
import {useTranslation} from "react-i18next";
import SchemaModal from "../Courses/SchemaModal.jsx";

const Laboratories = () => {
    const {t} = useTranslation();
    const [laboratories, setLaboratories] = useState([])
    const [selectedLab, setSelectedLab] = useState({
        id: null,
        title: ''
    })
    const [exercises, setExercises] = useState([])
    const [isViewExerciseOpen, setIsViewExerciseOpen] = useState(false)
    const [isSolveExerciseOpen, setIsSolveExerciseOpen] = useState(false)
    const [isReportExerciseOpen, setIsReportExerciseOpen] = useState(false)
    const [selectedExercise, setSelectedExercise] = useState(null)
    const [isSchemaModalOpen, setIsSchemaModalOpen] = useState(false);
    const onCloseSchemaModal = () => {
        setIsSchemaModalOpen(false);
    }
    const fetchExercisesByLabId = async (labId) => {
        try {
            const response = await api.get(`http://127.0.0.1:8000/api/v1/exercise/user/by-laboratory/${labId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.status === 200) {
                const exercisesData = getSuccessData(response);
                exercisesData.sort((a, b) => a.order_index - b.order_index)
                for (const exercise of exercisesData) {
                    exercise.status = await fetchExerciseStatus(exercise.id);
                }
                setExercises(exercisesData);
            }
        } catch (err) {
            const message = getErrorResponseMessage(err);
            toast.error(message);
        }
    }

    const fetchExerciseStatus = async (exerciseId) => {
        try {
            const response = await api.get(`http://127.0.0.1:8000/api/v1/exercise_history/status/${exerciseId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.status === 200) {
                return getSuccessData(response);
            }
        } catch (err) {
            const message = getErrorResponseMessage(err);
            toast.error(t(`backend.${message}`));
        }
    }
    const fetchLaboratories = async () => {
        try {
            const response = await api.get("http://127.0.0.1:8000/api/v1/laboratory", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.status === 200) {
                const labs = getSuccessData(response)
                    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
                    .sort((a, b) => a.order_index - b.order_index);
                setLaboratories(labs);
            }
        } catch (err) {
            const message = getErrorResponseMessage(err);
            toast.error(t(`backend.${message}`));
        }
    }

    useEffect(() => {
        fetchLaboratories();
    }, [])

    const handleSelectLab = (labId, title) => {
        setSelectedLab({
            id: labId,
            title: title
        });
        fetchExercisesByLabId(labId);
    }
    return (
        <div className="mt-6 w-[90%] mx-auto">
            <div className="flex items-center gap-10">
                <div>
                    <h1 className="text-3xl font-bold mb-2">
                        {t('laboratories.title')}</h1>
                    <p className="text-slate-600 mb-6">
                        {t('laboratories.description')}
                    </p>
                </div>
                <button
                    onClick={() => setIsSchemaModalOpen(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <DatabaseZap className="w-5 h-5"/>
                </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
                        <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 px-2">
                            {t('common.labs')}
                        </h2>
                        <p
                            className="text-slate-500 text-sm mb-4 px-2 py-2 border-b border-slate-200">
                            {t('laboratories.select_lab')}
                        </p>
                        {laboratories.length === 0 ? (
                            <div className="text-center py-8">
                                <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3"/>
                                <p className="text-slate-500 text-sm">No laboratories yet</p>
                            </div>
                        ) : (
                            <LaboratoriesList selectedLab={selectedLab} laboratories={laboratories}
                                              handleSelectLab={handleSelectLab}/>
                        )}
                    </div>
                </div>
                <div
                    className="flex flex-col gap-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-3 lg:col-span-3 mb-2">
                    <h2
                        className="text-lg font-bold text-slate-900 mb-2"
                    >
                        {selectedLab.title ? `${t('laboratories.exercise_for_lab')}: ${selectedLab.title}` : (t('laboratories.choose_lab'))}
                    </h2>
                    {exercises && exercises.length > 0 ?
                        <div className="flex flex-col gap-4 h-[450px] overflow-y-auto">
                            {exercises.map((exercise, index) => {
                                return <ExerciseCard
                                    key={exercise.id}
                                    index={index}
                                    exercise={exercise}
                                    setSelectedExercise={setSelectedExercise}
                                    setIsViewExerciseOpen={setIsViewExerciseOpen}
                                    setIsSolveExerciseOpen={setIsSolveExerciseOpen}
                                    setIsReportExerciseOpen={setIsReportExerciseOpen}
                                />
                            })
                            }
                        </div>
                        :
                        <div
                            className="flex flex-col h-[450px] items-center justify-center bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
                            <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4"/>
                            <h2 className="text-slate-500 mb-4">
                                No exercises in this laboratory yet
                            </h2>

                        </div>
                    }
                </div>
            </div>
            {
                isViewExerciseOpen && (
                    <ViewExerciseModal
                        isOpen={isViewExerciseOpen}
                        onClose={() => setIsViewExerciseOpen(false)}
                        exercise={selectedExercise}
                        fetchExercisesByLabId={fetchExercisesByLabId}
                    />
                )
            }
            {
                isSolveExerciseOpen && (
                    <SolveExerciseModal
                        isOpen={isSolveExerciseOpen}
                        onClose={() => setIsSolveExerciseOpen(false)}
                        exercise={selectedExercise}
                        fetchExercisesByLabId={fetchExercisesByLabId}
                        laboratory={selectedLab}
                    />
                )
            }
            {
                isReportExerciseOpen && (
                    <ReportExerciseModal
                        isOpen={isReportExerciseOpen}
                        onClose={() => setIsReportExerciseOpen(false)}
                        exercise={selectedExercise}
                        laboratory={selectedLab}
                    />
                )
            }
            {
                isSchemaModalOpen && (
                    <SchemaModal
                        isOpen={isSchemaModalOpen}
                        onClose={onCloseSchemaModal}
                    />
                )
            }
        </div>
    );
};

export default Laboratories;
