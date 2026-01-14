import React, {useEffect, useState} from 'react';
import api from "../../../../services/api.tsx";
import {getErrorResponseMessage, getSuccessData} from "../../../../utils/responses.jsx";
import ExercisesStatsBarChartModel from "./ExercisesStatsBarChartModel.jsx";
import {useTranslation} from "react-i18next";

const UnsolvedExercisesStatsBarChartModel = () => {
    const {t} = useTranslation();
    const [rawStats, setRawStats] = useState([]);

    useEffect(() => {
        const fetchAllExerciseStats = async () => {
            try {
                const response = await api.get("http://localhost:8000/api/v1/exercise_history/stats/exercises/unsolved", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                if (response.status === 200) {
                    const exercisesArray = getSuccessData(response);
                    setRawStats(exercisesArray);
                }
            } catch (error) {
                const message = getErrorResponseMessage(error) || t('stats.load_stats_failed');
                setRawStats([]);
            }
        };

        fetchAllExerciseStats();
    }, []);
    return (
        <div>
            <ExercisesStatsBarChartModel
                rawStats={rawStats}
                fieldFilter="attempts"
                title={t('stats.exercises_unsolved_by#_of_attempts')}
                bar={`# of ${t('stats.attempts')}`}
            />
        </div>
    );
};

export default UnsolvedExercisesStatsBarChartModel;