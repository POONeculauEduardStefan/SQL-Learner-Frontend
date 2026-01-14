import React, { useEffect, useState, useMemo } from 'react';
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import api from "../../../../services/api.tsx";
import { getErrorResponseMessage, getSuccessData } from "../../../../utils/responses.jsx";
import { toast } from "react-toastify";
import {User} from "lucide-react";
import {useTranslation} from "react-i18next";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const UserActivityChart = ({ users }) => {
    const {t} = useTranslation();
    const [selectedUserId, setSelectedUserId] = useState("");
    const [history, setHistory] = useState([]);

    useEffect(() => {
        if (!selectedUserId) {
            setHistory([]);
            return;
        }

        const fetchHistory = async () => {
            try {
                const response = await api.get(`http://localhost:8000/api/v1/exercise_history/by-user-id/${selectedUserId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (response.status === 200) {
                    const usersHistory = getSuccessData(response);
                    setHistory(usersHistory || []);
                }
            } catch (error) {
                const message = getErrorResponseMessage(error) || "Error fetching exercise history";
                toast.error(message);
                setHistory([]);
            }
        };

        fetchHistory();
    }, [selectedUserId]);

    const chartData = useMemo(() => {
        if (!history || history.length === 0) return null;

        const monthlyStats = {};

        history.forEach((entry) => {
            const date = new Date(entry.created_at);
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

            if (!monthlyStats[monthKey]) {
                monthlyStats[monthKey] = 0;
            }
            monthlyStats[monthKey] += 1;
        });

        const sortedKeys = Object.keys(monthlyStats).sort();

        const labels = sortedKeys.map(key => {
            const [year, month] = key.split('-');
            const dateObj = new Date(parseInt(year), parseInt(month) - 1);
            return dateObj.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        });

        const dataValues = sortedKeys.map(key => monthlyStats[key]);

        return {
            labels: labels,
            datasets: [
                {
                    label: "Exercises Completed",
                    data: dataValues,
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 2,
                    tension: 0.3,
                    pointRadius: 4,
                    fill: true
                }
            ]
        };
    }, [history]);

    return (
        <div className="chart-container w-full p-4 bg-white rounded-lg shadow-sm">
            <div className="mb-4">
                <select
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={selectedUserId}
                    onChange={(e) => setSelectedUserId(e.target.value)}
                >
                    <option value="">{t('common.select_user_activity')}</option>
                    <option value="all">{t('common.all_users')}</option>
                    {users && users.map((user) => (
                        <option key={user.id} value={user.id}>
                            ({user.email})
                        </option>
                    ))}
                </select>
            </div>

            <div className="h-80 w-full flex items-center justify-center">
                {chartData ? (
                    <Line
                        data={chartData}
                        options={{
                            transitions: {
                                active: {
                                    animation: {
                                        duration: 0
                                    }
                                }
                            },
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                title: {
                                    display: true,
                                    text: "Count of Exercises Completed by Month"
                                },
                                legend: {
                                    display: false,
                                },
                                tooltip: {
                                    mode: 'index',
                                    intersect: false,
                                }
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        stepSize: 1
                                    }
                                },
                                x: {
                                    ticks: {
                                        autoSkip: false,
                                        maxRotation: 90,
                                        minRotation: 45
                                    }
                                }
                            }
                        }}
                    />
                ) : (
                    <div className="flex flex-col items-center text-center text-slate-400 gap-5">
                        <User className="w-10 h-10"/>
                        <p className="text-slate-500 italic">
                            {selectedUserId ? t('common.no_activity_user') : t('common.select_user')}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserActivityChart;