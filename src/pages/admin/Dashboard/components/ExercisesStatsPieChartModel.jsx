import React, {useMemo} from 'react';
import {Pie} from "react-chartjs-2";
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExerciseStatsPieChartModel = ({rawStats, fieldFilter, title}) => {

    const chartData = useMemo(() => {
        if (!rawStats || rawStats.length === 0) return null;
        return {
            labels: rawStats.map(stat => stat.exercise_id),
            datasets: [
                {
                    label: 'Count',
                    data: rawStats.map(stat => stat[fieldFilter]),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1,
                },
            ],
        };
    }, [rawStats]);

    return (
        <div className="chart-container w-full p-4 bg-white rounded-lg shadow-sm">

            <div className="h-80 w-full flex items-center justify-center">
                {chartData ? (
                    <Pie
                        data={chartData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            transitions: {
                                active: {
                                    animation: {
                                        duration: 0
                                    }
                                }
                            },
                            plugins: {
                                legend: {
                                    display: false
                                },
                                title: {
                                    display: true,
                                    text: title,
                                    font: {
                                        size: 16
                                    }
                                }
                            }
                        }}
                    />
                ) : (
                    <p className="text-gray-500">There is no data to display.</p>
                )}
            </div>
        </div>
    );
};

export default ExerciseStatsPieChartModel;