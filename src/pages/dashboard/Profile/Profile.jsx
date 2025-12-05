import {useEffect, useState} from 'react';
import api from "../../../services/api.js";
import {toast} from "react-toastify";
import ProfileCard from "./components/ProfileCard.jsx";
import ProfileInformationCard from "./components/ProfileInformationCard.jsx";
import {getErrorResponseMessage, getSuccessData} from "../../../utils/responses.jsx";
import ProfileReportStatus from "./components/ProfileReportStatus.jsx";
import ProfileExerciseHistory from "./components/ProfileExerciseHistory.jsx";


export default function Profile() {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
    });
    const [image, setImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const [userStats, setUserStats] = useState({
        laboratory_count: 0,
        query_count: 0,
        exercises_count: 0,
    });

    useEffect(() => {
        loadProfile();
        loadStats();
    }, []);

    const loadProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await api.get("http://127.0.0.1:8000/api/v1/auth/account", {
                headers: {Authorization: `Bearer ${token}`},
            });
            const data = getSuccessData(response);
            setUser(data)
            if (data) {
                setFormData({
                    username: data.username || '',
                    firstName: data.first_name || '',
                    lastName: data.last_name || '',
                    currentPassword: '',
                    newPassword: '',
                    confirmNewPassword: ''
                });
                setImage(data.image || null);
            } else {
                setFormData({
                    username: '',
                    firstName: '',
                    lastName: '',
                    currentPassword: '',
                    newPassword: '',
                    confirmNewPassword: ''
                });
            }
        } catch (err) {
            const message = getErrorResponseMessage(err) || 'Failed to load profile';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    const loadStats = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await api.get("http://127.0.0.1:8000/api/v1/auth/stats", {
                headers: {Authorization: `Bearer ${token}`},
            });
            const data = getSuccessData(response);
            setUserStats(data)
        } catch (err) {
            const message = getErrorResponseMessage(err) || 'Failed to load profile';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return;

        setSaving(true);

        try {
            const token = localStorage.getItem("token");
            const response = await api.post("http://127.0.0.1:8000/api/v1/auth/update-account", {
                first_name: formData.firstName,
                last_name: formData.lastName,
            }, {
                headers: {Authorization: `Bearer ${token}`},
            });
            if (response.status === 200) {
                toast.success('Profile updated successfully!');
                const data = getSuccessData(response);
                setUser(data);
            }
        } catch (err) {
            const message = getErrorResponseMessage(err) || 'Failed to update profile';
            toast.error(message);
        } finally {
            setSaving(false);
        }
    };

    const handleChangeImage = async () => {
        if (!user || !selectedFile) return;
        const token = localStorage.getItem("token");

        setSaving(true);
        try{
            const dataToSend = new FormData();
            dataToSend.append('image', selectedFile);
            const response = await api.put("http://127.0.0.1:8000/api/v1/auth/update-image", dataToSend,{
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            })
            if (response.status === 200) {
                toast.success('Profile image updated successfully!');
                const data = getSuccessData(response);
                setPreviewUrl(null);
                setIsEditing(false);
                setImage(data.image);
            }
        }catch (err){
            const message = getErrorResponseMessage(err) || 'Failed to update profile image';
            toast.error(message);
        } finally {
            setSaving(false);
        }

    }

    const handleChangePassword = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!user) return;

        setSaving(true);
        if (!formData.currentPassword || !formData.newPassword || !formData.confirmNewPassword) {
            toast.error("Please fill in all fields");
            setSaving(false);
            return;
        }
        if (formData.newPassword !== formData.confirmNewPassword) {
            toast.error("Passwords don't match");
            setSaving(false);
            return;
        }

        if (formData.newPassword.length < 8 || !/\d/.test(formData.newPassword) || !/[a-z]/.test(formData.newPassword) || !/[A-Z]/.test(formData.newPassword) || !/[!@#$%^&*]/.test(formData.newPassword)) {
            toast.error("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character");
            setSaving(false);
            return;
        }

        try {
            const response = await api.post("http://127.0.0.1:8000/api/v1/auth/update-password", {
                current_password: formData.currentPassword,
                new_password: formData.newPassword
            }, {
                headers: {Authorization: `Bearer ${token}`},
            });
            if (response.status === 200) {
                toast.success("Password changed successfully");
                setFormData({
                    ...formData,
                    currentPassword: '',
                    newPassword: '',
                    confirmNewPassword: ''
                });
                setIsEditing(false);
                setSaving(false);
            }
        } catch (error) {
            const message = getErrorResponseMessage(error) || 'Failed to change password';
            toast.error(message);
        } finally {
            setLoading(false);
            setSaving(false);
        }
    }

    const handleCancel = () => {
        setFormData({
            username: user?.username || '',
            firstName: user?.first_name || '',
            lastName: user?.last_name || '',
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: ''
        });
    };

    const handleClose = () => {
        handleCancel();
        setIsEditing(false);
    }

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-6">
            <div className="mb-2">
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">Profile</h1>
                <p className="text-slate-600 text-sm sm:text-base">Manage your account information</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ProfileCard
                    user={user}
                    image={image}
                    previewUrl={previewUrl}
                    setSelectedFile={setSelectedFile}
                    setPreviewUrl={setPreviewUrl}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    handleChangeImage={handleChangeImage}
                />
                <ProfileInformationCard
                    user={user}
                    isEditing={isEditing}
                    formData={formData}
                    userStats={userStats}
                    setFormData={setFormData}
                    handleSubmit={handleSubmit}
                    handleChangePassword={handleChangePassword}
                    handleCancel={handleCancel}
                    handleClose={handleClose}
                    saving={saving}/>
                <ProfileReportStatus/>
                <ProfileExerciseHistory/>
            </div>
        </div>
    );
}
