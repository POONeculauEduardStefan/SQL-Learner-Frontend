import React, {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {toast} from "react-toastify";
import api from "../../services/api.js";
import {getErrorResponseMessage} from "../../utils/responses.jsx";
import {useTranslation} from "react-i18next";


const ConfirmEmail = () => {
    const {t} = useTranslation()
    const navigate = useNavigate();
    const {token} = useParams();

    useEffect(() => {
        handleConfirmEmail();
    }, []);

    const handleConfirmEmail = async () => {

        if (!token) {
            toast.error(t('common.invalid_or_missing_token'));
            return;
        }

        try {
            const response = await api.post("/api/v1/auth/confirm-email", {
                secret_token: token,
            })
            if (response.status === 200) {
                toast.success(t('common.account_verification_success'));
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