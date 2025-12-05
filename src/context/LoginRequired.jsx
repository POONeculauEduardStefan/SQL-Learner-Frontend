import {Navigate, Outlet} from "react-router-dom";
import api from "../services/api";
import {useEffect, useState, createContext, useContext} from "react";


const UserContext = createContext({
    token: null,
    userId: null,
    email: null,
    role: null,
});

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

export default function LoginRequired() {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
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
                setIsAuthenticated(false);
                return;
            }

            try {
                const response = await api.get("http://127.0.0.1:8000/api/v1/auth/account", {
                    headers: {Authorization: `Bearer ${token}`},
                });


                if (response.status === 200 && response.data?.data.id) {
                    setIsAuthenticated(true);
                    setUser({
                        token,
                        userId: response.data.data.id,
                        email: response.data.data.email,
                        role: response.data.data.role,
                    });
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error(error);
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

    if (!isAuthenticated) {
        return <Navigate to="/auth/sign-in" replace/>;
    }

    return (
        <UserContext.Provider value={user}>
            <Outlet/>
        </UserContext.Provider>
    );
}