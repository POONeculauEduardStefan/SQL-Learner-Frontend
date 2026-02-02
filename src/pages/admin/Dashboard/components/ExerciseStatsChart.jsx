import React, {useEffect, useState} from 'react';
import api from "../../../../services/api.tsx";
import {getErrorResponseMessage, getSuccessData} from "../../../../utils/responses.jsx";
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from 'chart.js';
import ExercisesStatsPieChartModel from "./ExercisesStatsPieChartModel.jsx";
import ExercisesStatsBarChartModel from "./ExercisesStatsBarChartModel.jsx";
import UnsolvedExercisesStatsBarChartModel from "./UnsolvedExercisesStatsBarChartModel.jsx";
import {useTranslation} from "react-i18next";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExerciseStatsChart = () => {
    const {t} = useTranslation();
    const [rawStats, setRawStats] = useState([]);

    useEffect(() => {
        const fetchAllExerciseStats = async () => {
            try {
                const response = await api.get("http://127.0.0.1:8000/api/v1/exercise_history/stats/exercises", {
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <ExercisesStatsPieChartModel rawStats={rawStats} fieldFilter="exercise_failures"
                                         title={t('stats.exercises_by_#_failures')}/>
            <ExercisesStatsPieChartModel rawStats={rawStats} fieldFilter="exercises_successes"
                                         title={t('stats.exercises_by_#_successes')}/>
            <ExercisesStatsBarChartModel rawStats={rawStats} fieldFilter="completion_rate"
                                         title={t('stats.exercises_completion_rate')} bar={`% ${t('stats.completion')}`}/>
            <UnsolvedExercisesStatsBarChartModel/>
        </div>
    );
};

export default ExerciseStatsChart;