import React, {useState} from 'react';
import {CheckCircle, Eye, EyeOff, Lock, Mail, Save, User, X} from "lucide-react";
import {useTranslation} from "react-i18next";

const ProfileInformationCard = ({
                                    isEditing,
                                    handleSubmit,
                                    handleCancel,
                                    handleClose,
                                    handleChangePassword,
                                    formData,
                                    userStats,
                                    setFormData,
                                    saving,
                                    user
                                }) => {
    const {t} = useTranslation();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const handleCloseModal = () => {
        setIsPasswordVisible(false);
        setIsConfirmPasswordVisible(false);
        handleCancel()
    }

    return (
            <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-slate-200 p-3 sm:p-5">
                {isEditing ? (
                    <>
                        <form onSubmit={handleSubmit} className="mb-4">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{t('profile.edit_profile')}</h3>
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                                >
                                    <X className="w-6 h-6"/>
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="firstName"
                                           className="block text-sm font-medium text-slate-700 mb-2">
                                        {t('common.first_name')}
                                    </label>
                                    <div className="relative">
                                        <User
                                            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"/>
                                        <input
                                            id="firstName"
                                            type="text"
                                            value={formData.firstName || ''}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                firstName: e.target.value
                                            })}
                                            className="w-full pl-12 pr-4 py-3.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            placeholder="John"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="lastName"
                                           className="block text-sm font-medium text-slate-700 mb-2">
                                        {t('common.last_name')}
                                    </label>
                                    <div className="relative">
                                        <User
                                            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"/>
                                        <input
                                            id="lastName"
                                            type="text"
                                            value={formData.lastName || ''}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                lastName: e.target.value
                                            })}
                                            className="w-full pl-12 pr-4 py-3.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            placeholder="Doe"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email"
                                           className="block text-sm font-medium text-slate-700 mb-2">
                                        {t('common.email')}
                                    </label>
                                    <div className="relative">
                                        <Mail
                                            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"/>
                                        <input
                                            id="email"
                                            type="email"
                                            value={user?.email || ''}
                                            disabled
                                            className="w-full pl-12 pr-4 py-3.5 border border-slate-300 rounded-xl bg-slate-50 text-slate-500 cursor-not-allowed"
                                        />
                                    </div>
                                    <p className="mt-2 text-xs text-slate-500">{t('error.email_cannot_be_changed')}</p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                    >
                                        <Save className="w-4 h-4"/>
                                        <span>{saving ? t('common.save_loading') : t('common.save_changes')}</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3.5 rounded-xl transition-colors cursor-pointer"
                                    >
                                        {t('common.cancel')}
                                    </button>
                                </div>
                            </div>
                        </form>
                        <form onSubmit={handleChangePassword}
                              className="flex flex-col gap-4 mt-4 pt-4 border-t border-slate-200">
                            <div>
                                <label htmlFor="password"
                                       className="block text-sm font-medium text-slate-700 mb-2">
                                    {t('common.current_password')}
                                </label>
                                <div className="relative">
                                    <Lock
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"/>
                                    <input
                                        id="password"
                                        type={isPasswordVisible ? 'text' : 'password'}
                                        value={formData.currentPassword || ''}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            currentPassword: e.target.value
                                        })}
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-4 py-3.5 border border-slate-300 rounded-xl"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                                    >
                                        {isPasswordVisible ? (
                                            <EyeOff className="w-5 h-5"/>
                                        ) : (
                                            <Eye className="w-5 h-5"/>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="confirmPassword"
                                       className="block text-sm font-medium text-slate-700 mb-2">
                                    {t('common.new_password')}
                                </label>
                                <div className="relative">
                                    <Lock
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"/>
                                    <input
                                        id="confirmPassword"
                                        type={isConfirmPasswordVisible ? 'text' : 'password'}
                                        value={formData.newPassword || ''}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            newPassword: e.target.value
                                        })}
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-4 py-3.5 border border-slate-300 rounded-xl "
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                                    >
                                        {isConfirmPasswordVisible ? (
                                            <EyeOff className="w-5 h-5"/>
                                        ) : (
                                            <Eye className="w-5 h-5"/>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="confirmNewPassword"
                                       className="block text-sm font-medium text-slate-700 mb-2">
                                    {t('common.confirm_new_password')}
                                </label>
                                <div className="relative">
                                    <Lock
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"/>
                                    <input
                                        id="confirmNewPassword"
                                        type="password"
                                        value={formData.confirmNewPassword || ''}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            confirmNewPassword: e.target.value
                                        })}
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-4 py-3.5 border border-slate-300 rounded-xl"
                                    />
                                    {formData.newPassword && formData.confirmNewPassword && formData.newPassword === formData.confirmNewPassword && (
                                        <CheckCircle
                                            className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-700"/>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    <Save className="w-4 h-4"/>
                                    <span>{saving ? t('common.save_loading') : t('common.change_password')}</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3.5 rounded-xl transition-colors cursor-pointer"
                                >
                                    {t('common.cancel')}
                                </button>
                            </div>
                        </form>
                    </>

                ) : (
                    <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">{t('profile_information.title')}</h3>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-2">{t('common.full_name')}</label>
                                <p className="text-lg text-slate-900 font-medium">
                                    {user?.first_name + ' ' + user?.last_name || 'No Name'}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-2">{t('common.email')}</label>
                                <p className="text-lg text-slate-900 font-medium break-all">{user?.email}</p>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-slate-200">
                            <h4 className="text-lg font-semibold text-slate-900 mb-4">{t('common.account_statistics')}</h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                <div className="bg-slate-50 rounded-xl p-4">
                                    <p className="text-sm text-slate-600 mb-1">{t('common.labs')}</p>
                                    <p className="text-2xl font-bold text-blue-600">{userStats.laboratory_count}</p>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-4">
                                    <p className="text-sm text-slate-600 mb-1">{t('common.exercises')}</p>
                                    <p className="text-2xl font-bold text-emerald-600">{userStats.exercises_count}</p>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-4 col-span-2 sm:col-span-1">
                                    <p className="text-sm text-slate-600 mb-1">{t('common.queries')}</p>
                                    <p className="text-2xl font-bold text-amber-600">{userStats.query_count}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
    );
};

export default ProfileInformationCard;
