import React from 'react';
import {Calendar, Camera, Check, CreditCard as Edit2, Mail, User, X} from "lucide-react";
import {useTranslation} from "react-i18next";

const ProfileCard = ({
                         user,
                         image,
                         previewUrl,
    setSelectedFile,
                         setPreviewUrl,
                         isEditing,
                         setIsEditing,
                         handleChangeImage
                     }) => {
    const {t} = useTranslation();
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
        }
    };
    return (
        <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-8">
                <div className="flex flex-col items-center">
                    <div className="relative inline-block">
                        {(previewUrl || image) && <img
                            src={!previewUrl ? `data:image/jpeg;base64,${image}` : previewUrl}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover border-4 border-indigo-50 shadow-sm mx-auto"
                        />}
                        {(!previewUrl && !image) && <div
                            className="w-32 h-32 rounded-full bg-slate-100 flex items-center justify-center border-4 border-indigo-50 shadow-sm mx-auto">
                            <User className="w-16 h-16 text-slate-300"/>
                        </div>}
                        {isEditing && (
                            <>
                                <div className="absolute bottom-20 left-32">
                                    <label htmlFor="file-upload"
                                           className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg flex items-center justify-center transition-colors">
                                        <Camera size={18}/>
                                    </label>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </div>
                                <button className="absolute bottom-10 left-32"
                                        onClick={handleChangeImage}
                                >
                                    <div
                                        className="cursor-pointer bg-green-600 hover:bg-green-700 text-white p-2 rounded-full shadow-lg flex items-center justify-center transition-colors"
                                    >
                                        <Check size={18}/>
                                    </div>
                                </button>
                                <button className="absolute bottom-0 left-32"
                                        onClick={() => {
                                            setPreviewUrl(null);
                                            setIsEditing(false);
                                        }}
                                >
                                    <div
                                        className="cursor-pointer bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg flex items-center justify-center transition-colors">
                                        <X size={18}/>
                                    </div>
                                </button>
                            </>
                        )}
                    </div>


                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 text-center mb-1">
                        {user?.first_name + ' ' + user?.last_name || 'No Name'}
                    </h2>

                    <p className="text-slate-500 text-sm mb-6 text-center break-all">{user?.email}</p>

                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors cursor-pointer"
                        >
                            <Edit2 className="w-4 h-4"/>
                            <span>{t('profile.edit_profile')}</span>
                        </button>
                    )}
                </div>

                <div className="mt-8 pt-8 border-t border-slate-200 space-y-4">
                    <div className="flex items-center gap-3 text-sm">
                        <Mail className="w-5 h-5 text-slate-400"/>
                        <div>
                            <p className="text-slate-500">Email</p>
                            <p className="text-slate-900 font-medium break-all">{user?.email}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                        <Calendar className="w-5 h-5 text-slate-400"/>
                        <div>
                            <p className="text-slate-500">{t('profile.member_since')}</p>
                            <p className="text-slate-900 font-medium">
                                {user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                }) : 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
