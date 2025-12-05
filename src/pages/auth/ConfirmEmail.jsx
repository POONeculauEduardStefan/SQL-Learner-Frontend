import React, {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {toast} from "react-toastify";
import api from "../../services/api.js";
import {getErrorResponseMessage} from "../../utils/responses.jsx";


const ConfirmEmail = () => {
    const navigate = useNavigate();
    const {token} = useParams();

    useEffect(() => {
        handleConfirmEmail();
    }, []);

    const handleConfirmEmail = async () => {

        if (!token) {
            toast.error("Invalid or missing token");
            return;
        }

        try {
            const response = await api.post("/api/v1/auth/confirm-email", {
                secret_token: token,
            })
            if (response.status === 200) {
                toast.success("Account verification was successfully");
                navigate("/")
            }
        } catch (error) {
            const message = getErrorResponseMessage(error);
            toast.error(message);
            navigate("/")
        }
    }

    return (
        <></>
    );
};

export default ConfirmEmail;