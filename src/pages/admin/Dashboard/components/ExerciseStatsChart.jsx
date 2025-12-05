import React, {useEffect, useState} from 'react';
import api from "../../../../services/api.tsx";
import {getErrorResponseMessage, getSuccessData} from "../../../../utils/responses.jsx";
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from 'chart.js';
import ExercisesStatsPieChartModel from "./ExercisesStatsPieChartModel.jsx";
import ExercisesStatsBarChartModel from "./ExercisesStatsBarChartModel.jsx";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExerciseStatsChart = () => {
    const [rawStats, setRawStats] = useState([]);

    useEffect(() => {
        const fetchAllExerciseStats = async () => {
            try {
                const response = await api.get("http://localhost:8000/api/v1/exercise_history/stats/exercises", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                if (response.status === 200) {
                    const exercisesArray = getSuccessData(response);
                    setRawStats(exercisesArray);
                }
            } catch (error) {
                const message = getErrorResponseMessage(error) || "Error fetching stats";
                console.error(message);
                setRawStats([]);
            }
        };

        fetchAllExerciseStats();
    }, []);


    return (
        <div  className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <ExercisesStatsPieChartModel rawStats={rawStats} fieldFilter="exercise_failures"
                                      title="Exercises by # of failures"/>
            <ExercisesStatsPieChartModel rawStats={rawStats} fieldFilter="exercises_successes"
                                      title="Exercises by # of successes"/>
            <ExercisesStatsBarChartModel rawStats={rawStats} fieldFilter="completion_rate"
                                      title="Exercises completion rate"/>
        </div>
    );
};

export default ExerciseStatsChart;