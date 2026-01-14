import React, {useEffect, useState} from "react";
import api from "../../../services/api.tsx";
import {getErrorResponseMessage, getSuccessData} from "../../../utils/responses.jsx";
import {toast} from "react-toastify";
import ScoreTemplate from "./ScoreTemplate.jsx";
import {useTranslation} from "react-i18next";

const Scoreboard = () => {
    const {t} = useTranslation();
    const [exercisesScore, setExercisesScore] = useState([]);
    const [labScores, setLabScores] = useState([]);
    const [isExercisesSelected, setIsExercisesSelected] = useState(true);
    const handleFetchScoresExercises = async () => {
        try {
            const response = await api.get("http://localhost:8000/api/v1/exercise_history/score/exercises",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
            if (response.status === 200) {
                const data = getSuccessData(response).sort((a, b) => b.score - a.score);
                setExercisesScore(data);
            }
        } catch (error) {
            const message = getErrorResponseMessage(error);
            toast.error(message || t('error.failed_to_fetch_scores'));
        }
    }

    const handleFetchScoresLaboratory = async () => {
        try {
            const response = await api.get("http://localhost:8000/api/v1/exercise_history/score/laboratories",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
            if (response.status === 200) {
                const data = getSuccessData(response)
                const scoresArray = Object.values(data);
                setLabScores([]);
                scoresArray.map(userScore => {
                    setLabScores(prevScores => [...prevScores, userScore]);
                });
            }
        } catch (error) {
            const message = getErrorResponseMessage(error);
            toast.error(message || t('error.failed_to_fetch_labs_scores'));
        }
    }

    useEffect(() => {
        if (isExercisesSelected) {
            handleFetchScoresExercises();
        } else {
            handleFetchScoresLaboratory();
        }
    }, [isExercisesSelected]);

    return (
        <div className="container mx-auto max-w-3xl mt-10">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">{t('leaderboard.title')}</h2>
                <div className="flex justify-center mt-6 space-x-4 mb-5">
                    <button
                        onClick={() => setIsExercisesSelected(true)}
                        className={`px-4 py-2 rounded-lg font-medium ${isExercisesSelected ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                        {t('common.exercises')}
                    </button>
                    <button
                        onClick={() => setIsExercisesSelected(false)}
                        className={`px-4 py-2 rounded-lg font-medium ${!isExercisesSelected ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                        {t('common.labs')}
                    </button>
                </div>
                {isExercisesSelected ? <ScoreTemplate
                        score={exercisesScore}
                    /> :
                    <ScoreTemplate
                        score={labScores}
                    />
                }
            </div>
        </div>
    );
};

export default Scoreboard;