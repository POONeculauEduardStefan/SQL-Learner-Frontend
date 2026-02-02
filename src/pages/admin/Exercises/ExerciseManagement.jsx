import React, {useEffect, useState} from 'react';
import {BookOpen, Plus} from 'lucide-react';
import AddLaboratoryModal from './Components/AddLaboratoryModal.jsx';
import AddExerciseModal from './Components/AddExerciseModal.jsx';
import EditExerciseModal from "./Components/EditExerciseModal.jsx";
import api from "../../../services/api.tsx";
import {getErrorResponseMessage, getSuccessData} from "../../../utils/responses.jsx";
import {toast} from "react-toastify";
import ExerciseCard from "./Components/ExerciseCard.jsx";
import DeleteEntityModal from "../../DeleteEntityModal.jsx";
import LaboratoriesList from "./components/LaboratoriesList.jsx";
import EditLaboratoryModal from "./components/EditLaboratoryModal.jsx";
import LaboratoryCardHeader from "./components/LaboratoryCardHeader.jsx";
import {useTranslation} from "react-i18next";
import GenerateExerciseModal from "./components/GenerateExerciseModal.jsx";

export default function ExercisesManagement() {
    const {t} = useTranslation();
    const [laboratories, setLaboratories] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [selectedLabId, setSelectedLabId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showLabModal, setShowLabModal] = useState(false);
    const [showExerciseModal, setShowExerciseModal] = useState(false);
    const [showGenerateModal, setShowGenerateModal] = useState(false);
    const [showEditExerciseModal, setShowEditExerciseModal] = useState(false);
    const [editingExercise, setEditingExercise] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isDeleteLaboratoryOpen, setIsDeleteLaboratoryOpen] = useState(false);
    const [isEditLaboratoryOpen, setIsEditLaboratoryOpen] = useState(false);

    useEffect(() => {
        loadLaboratories();
    }, []);

    useEffect(() => {
        if (selectedLabId) {
            loadExercises(selectedLabId);
        }
    }, [selectedLabId]);

    const loadLaboratories = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await api.get('http://127.0.0.1:8000/api/v1/laboratory', {
                headers: {Authorization: `Bearer ${token}`},
            });
            if (response.status === 200) {
                const data = getSuccessData(response)
                    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
                    .sort((a, b) => a.order_index - b.order_index);
                setLaboratories(data || []);
            }
        } catch (err) {
            console.error('Error loading laboratories:', err);
        } finally {
            setLoading(false);
        }
    };

    const loadExercises = async (labId) => {
        try {
            const response = await api.get(`http://127.0.0.1:8000/api/v1/exercise/by-laboratory/${labId}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
            });
            if (response.status === 200) {
                const data = getSuccessData(response).sort((a, b) => a.order_index - b.order_index);
                setExercises(data || []);
            }
        } catch (err) {
            const message = getErrorResponseMessage(err);
            toast.error(t(`backend.${message}`) || t('exercise_management.load_failed'));
        }
    };

    const handleDeleteLab = async (labId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await api.delete(`http://127.0.0.1:8000/api/v1/laboratory/${labId}`, {
                headers: {Authorization: `Bearer ${token}`},
            });
            if (response.status === 204) {
                toast.success(t('exercise_management.laboratory_delete_success'));
                await loadLaboratories();
            }
            if (selectedLabId === labId) {
                setSelectedLabId(null);
            }
        } catch (err) {
            const message = getErrorResponseMessage(err);
            toast.error(t(`backend.${message}`) || t('exercise_management.laboratory_delete_failure'));
        }
    };

    const handleDeleteExercise = async (exerciseId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await api.delete(`http://127.0.0.1:8000/api/v1/exercise/${exerciseId}`, {
                headers: {Authorization: `Bearer ${token}`},
            });
            if (response.status === 204) {
                toast.success(t('exercise_management.exercise_delete_success'));
                await loadExercises(selectedLabId);
            }
        } catch (err) {
            const message = getErrorResponseMessage(err);
            toast.error(t(`backend.${message}`) || t('exercise_management.exercise_delete_failure'));
        }
    };

    const handleOpenEdit = (exercise) => {
        setEditingExercise(exercise);
        setShowEditExerciseModal(true);
    };

    const handleCloseEdit = () => {
        setShowEditExerciseModal(false);
        setEditingExercise(null);
    };

    const filteredExercises = exercises.filter(exercise => {
        return exercise.request.toLowerCase().includes(searchQuery.toLowerCase())
            || exercise.id.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const selectedLab = laboratories.find(lab => lab.id === selectedLabId);

    const clearSearch = () => {
        setSearchQuery('');
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">{t('exercise_management.title')}</h1>
                    <p className="text-slate-600">{t('exercise_management.description')}</p>
                </div>
                <button
                    onClick={() => setShowLabModal(true)}
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-lg shadow-emerald-500/25 cursor-pointer"
                >
                    <Plus className="w-5 h-5"/>
                    <span>{t('exercise_management.add_laboratory')}</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
                        <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4 px-2">
                            {t('common.labs')}
                        </h2>

                        {laboratories.length === 0 ? (
                            <div className="text-center py-8">
                                <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3"/>
                                <p className="text-slate-500 text-sm">{t('exercise_management.no_labs_yet')}</p>
                                <button
                                    onClick={() => setShowLabModal(true)}
                                    className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm cursor-pointer"
                                >
                                    {t('exercise_management.create_first_lab')}
                                </button>
                            </div>
                        ) : (
                            <LaboratoriesList selectedLab={selectedLabId} setSelectedLabId={setSelectedLabId}
                                              laboratories={laboratories}/>
                        )}
                    </div>
                </div>

                <div className="lg:col-span-3">
                    {selectedLab ? (
                        <>
                            <LaboratoryCardHeader
                                selectedLab={selectedLab}
                                setIsEditLaboratoryOpen={setIsEditLaboratoryOpen}
                                setIsDeleteLaboratoryOpen={setIsDeleteLaboratoryOpen}
                                setShowExerciseModal={setShowExerciseModal}
                                setShowGenerateModal={setShowGenerateModal}
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                clearSearch={clearSearch}
                            />
                            {filteredExercises.length === 0 ? (
                                <div
                                    className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
                                    <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4"/>
                                    <p className="text-slate-500 mb-4">
                                        {searchQuery
                                            ? t('exercise_management.no_exercise_matching')
                                            : t('exercise_management.no_exercises_lab')
                                        }
                                    </p>
                                    {!searchQuery && (
                                        <button
                                            onClick={() => setShowExerciseModal(true)}
                                            className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
                                        >
                                            {t('exercise_management.add_first_exercise')}
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                    {filteredExercises.map((exercise, index) => (
                                        <ExerciseCard
                                            key={exercise.id}
                                            index={index}
                                            exercise={exercise}
                                            handleOpenEdit={handleOpenEdit}
                                            handleDeleteExercise={handleDeleteExercise}
                                        />))
                                    }
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
                            <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4"/>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">{t('exercise_management.no_lab_selected')}</h3>
                            <p className="text-slate-500">{t('exercise_management.select_or_create_lab')}</p>
                        </div>
                    )}
                </div>
            </div>

            <AddLaboratoryModal
                isOpen={showLabModal}
                onClose={() => setShowLabModal(false)}
                onSuccess={() => loadLaboratories()}
            />

            {selectedLabId && (
                <AddExerciseModal
                    isOpen={showExerciseModal}
                    onClose={() => setShowExerciseModal(false)}
                    onSuccess={() => selectedLabId && loadExercises(selectedLabId)}
                    laboratoryId={selectedLabId}
                />
            )}
            {selectedLabId && (
                <GenerateExerciseModal
                    isOpen={showGenerateModal}
                    onClose={() => setShowGenerateModal(false)}
                    onSuccess={() => selectedLabId && loadExercises(selectedLabId)}
                    laboratoryId={selectedLabId}
                />
            )}

            {editingExercise && (
                <EditExerciseModal
                    isOpen={showEditExerciseModal}
                    onClose={handleCloseEdit}
                    onSuccess={() => {
                        loadExercises(selectedLabId);
                        handleCloseEdit();
                    }}
                    exercise={editingExercise}
                    laboratories={laboratories}
                />
            )}
            <DeleteEntityModal
                isOpen={isDeleteLaboratoryOpen}
                onClose={() => setIsDeleteLaboratoryOpen(false)}
                deleteEntity={handleDeleteLab}
                entityId={selectedLabId}
                entityName={t('exercise_management.laboratory')}
            />
            <EditLaboratoryModal
                isOpen={isEditLaboratoryOpen}
                onClose={() => setIsEditLaboratoryOpen(false)}
                onSuccess={() => loadLaboratories()}
                laboratory={selectedLab}
            />
        </div>
    );
}