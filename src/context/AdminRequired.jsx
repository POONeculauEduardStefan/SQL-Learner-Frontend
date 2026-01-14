import {Navigate, Outlet} from "react-router-dom";
import api from "../services/api";
import {createContext, useContext, useEffect, useState} from "react";


const AdminContext = createContext({
    token: null,
    userId: null,
    email: null,
    role: null,
});

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (context === undefined) {
        throw new Error("useAdmin must be used within a AdminProvider");
    }
    return context;
};

export default function AdminRequired() {
    const [isAdmin, setIsAdmin] = useState(null);
    const [user, setUser] = useState({
        token: null,
        userId: null,
        email: null,
        role: null,
    });

    useEffect(() => {
        const checkLogin = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setIsAdmin(false);
                return;
            }

            try {
                const response = await api.get("http://127.0.0.1:8000/api/v1/auth/account", {
                    headers: {Authorization: `Bearer ${token}`},
                });


                if (response.status === 200 && response.data?.data.id) {
                    if (response.data?.data.role !== 1 && response.data?.data.role !== 2) {
                        setIsAdmin(false);
                        return;
                    }
                    setIsAdmin(true);
                    setUser({
                        token,
                        userId: response.data.data.id,
                        email: response.data.data.email,
                        role: response.data.data.role,
                    });
                } else {
                    setIsAdmin(false);
                }
            } catch (error) {
                setIsAdmin(false);
            }
        };

        checkLogin();
    }, []);

    if (isAdmin === null) {
        return (
            <div className="flex justify-center min-h-screen">
                <div className="flex flex-col min-h-screen items-center justify-center gap-5">
                    <div className="animate-spin rounded-full h-20 w-20 border-b-5 border-blue-600"></div>
                    <p className="ml-4 text-xl text-blue-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (!isAdmin) {
        return <Navigate to="/dashboard/not-found" replace/>;
    }

    return (
        <AdminContext.Provider value={user}>
            <Outlet/>
        </AdminContext.Provider>
    );
}