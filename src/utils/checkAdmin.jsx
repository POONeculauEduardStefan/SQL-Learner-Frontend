import {useEffect, useState} from 'react';
import api from "../services/api.js";
import {getErrorResponseMessage} from "./responses.jsx";

export function useIsAdmin() {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const checkIsAdmin = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await api.get("http://127.0.0.1:8000/api/v1/auth/account", {
                    headers: {Authorization: `Bearer ${token}`},
                });

                if (isMounted && response.status === 200 && response.data?.data.id) {
                    setIsAdmin(response.data?.data.role === 1 || response.data?.data.role === 2);
                }
            } catch (error) {
                if (isMounted) {
                    const message = getErrorResponseMessage(error);
                    // toast.error(message);
                }
            }
        };

        checkIsAdmin();

        return () => {
            isMounted = false;
        };
    }, []);

    return isAdmin;
}