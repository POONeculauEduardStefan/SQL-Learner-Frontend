import {Navigate, Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import api from "../services/api";

export default function ProtectedAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkLogin = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setIsAuthenticated(false);
                return;
            }

            try {
                const response = await api.get("http://127.0.0.1:8000/api/v1/auth/account", {
                    headers: {Authorization: `Bearer ${token}`},
                });

                if (response.status === 200 && response.data?.data.id) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
                // eslint-disable-next-line no-unused-vars
            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        checkLogin();
    }, []);

    if (isAuthenticated === null) {
        return (
            <div className="flex justify-center min-h-screen">
                <div className="flex flex-col min-h-screen items-center justify-center gap-5">
                    <div className="animate-spin rounded-full h-20 w-20 border-b-5 border-blue-600"></div>
                    <p className="ml-4 text-xl text-blue-600">Loading...</p>
                </div>
            </div>
        );
    }

    // If logged in, redirect to home
    if (isAuthenticated) {
        return <Navigate to="/dashboard/home" replace/>;
    }

    // If not logged in, allow auth pages
    return <Outlet/>;
}