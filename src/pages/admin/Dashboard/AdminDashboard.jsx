import Chart from "chart.js/auto";
import {CategoryScale} from "chart.js";
import {useEffect, useState} from "react";
import api from "../../../services/api.tsx";
import {getErrorResponseMessage, getSuccessData} from "../../../utils/responses.jsx";
import UserActivityChart from "./components/UserActivityChart.jsx";
import ExerciseStatsChart from "./components/ExerciseStatsChart.jsx";

const Data = [
    {
        id: 1,
        year: 2016,
        userGain: 80000,
        userLost: 823
    },
    {
        id: 2,
        year: 2017,
        userGain: 45677,
        userLost: 345
    },
    {
        id: 3,
        year: 2018,
        userGain: 78888,
        userLost: 555
    },
    {
        id: 4,
        year: 2019,
        userGain: 90000,
        userLost: 4555
    },
    {
        id: 5,
        year: 2020,
        userGain: 4300,
        userLost: 234
    }
];
Chart.register(CategoryScale);

export default function AdminDashboard() {
    const [users, setUsers] = useState([]);

    const fetchAllUsers = async () => {
        try {
            const response = await api.get("http://localhost:8000/api/v1/admin/users", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (response.status === 200) {
                const usersArray = getSuccessData(response);
                setUsers(usersArray);
            }
        } catch (error) {
            const message = getErrorResponseMessage(error) || "Error fetching users";
            console.error(message);
        }
    }

    useEffect(() => {
        fetchAllUsers();
    }, []);

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
                <p className="text-slate-600">Overview of platform statistics and activity</p>
            </div>
            <div className="flex flex-col gap-10">
                <div className="flex flex-col ">
                    <UserActivityChart users={users}/>
                </div>
                <div>
                    <ExerciseStatsChart />
                </div>
            </div>
        </div>
    );
}
