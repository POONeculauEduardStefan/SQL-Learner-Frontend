import React, {useMemo} from 'react';
import {Bar} from "react-chartjs-2";
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExerciseStatsBarChartModel = ({rawStats, fieldFilter, title}) => {

    const chartData = useMemo(() => {
        if (!rawStats || rawStats.length === 0) return null;
        rawStats = rawStats.filter(stat => stat[fieldFilter] > 0);
        rawStats.sort((a, b) => b[fieldFilter] - a[fieldFilter]);
        return {
            labels: rawStats.map(stat => stat.exercise_id),
            datasets: [
                {
                    label: '# of Completions',
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
                    <Bar
                        height={800}
                        data={chartData}
                        options={{
                            indexAxis: 'y',

                            responsive: true,
                            maintainAspectRatio: false,

                            plugins: {
                                legend: {
                                    display: false,
                                },
                                title: {
                                    display: true,
                                    text: title,
                                    font: {
                                        size: 16
                                    }
                                },
                                tooltip: {
                                    callbacks: {
                                        label: (context) => `${context.raw} % completion`
                                    }
                                }
                            },
                            scales: {
                                x: {
                                    beginAtZero: true,
                                    grid: {
                                        color: '#f3f4f6'
                                    }
                                },
                                y: {
                                    ticks: {
                                        autoSkip: false,
                                        font: {
                                            size: 11
                                        }
                                    },
                                    grid: {
                                        display: false
                                    }
                                },
                            },
                        }}
                    />
                ) : (
                    <p className="text-gray-500">There is no data to display.</p>
                )}
            </div>
        </div>
    );
};

export default ExerciseStatsBarChartModel;