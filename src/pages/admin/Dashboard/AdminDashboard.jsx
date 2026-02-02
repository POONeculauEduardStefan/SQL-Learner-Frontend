import Chart from "chart.js/auto";
import {CategoryScale} from "chart.js";
import {useEffect, useState} from "react";
import api from "../../../services/api.tsx";
import {getErrorResponseMessage, getSuccessData} from "../../../utils/responses.jsx";
import UserActivityChart from "./components/UserActivityChart.jsx";
import ExerciseStatsChart from "./components/ExerciseStatsChart.jsx";
import {useTranslation} from "react-i18next";

Chart.register(CategoryScale);

export default function AdminDashboard() {
    const {t} = useTranslation();
    const [users, setUsers] = useState([]);

    const fetchAllUsers = async () => {
        try {
            const response = await api.get("http://127.0.0.1:8000/api/v1/admin/users", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (response.status === 200) {
                const usersArray = getSuccessData(response).filter(user => user.role == 0);
                setUsers(usersArray);
            }
        } catch (error) {
            const message = getErrorResponseMessage(error) || t('error.fetching_users');
        }
    }

    useEffect(() => {
        fetchAllUsers();
    }, []);

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">{t('admin.admin_dashboard')}</h1>
                <p className="text-slate-600">{t('admin.admin_dashboard_description')}</p>
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
