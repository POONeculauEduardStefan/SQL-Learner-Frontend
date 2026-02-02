import {useEffect, useState} from 'react';
import {Loader2, X} from 'lucide-react';
import {toast} from "react-toastify";
import api from "../../../../services/api.tsx";
import {getErrorResponseMessage} from "../../../../utils/responses.jsx";
import {useTranslation} from "react-i18next";

export default function EditLaboratoryModal({isOpen, onClose, onSuccess, laboratory}) {
    const {t} = useTranslation();
    const [formData, setFormData] = useState({
        title: '',
        order_index: 0,
    });
    const [loading, setLoading] = useState(false);
    const [mouseDownTarget, setMouseDownTarget] = useState(null);

    useEffect(() => {
        if (laboratory && isOpen) {
            setFormData({
                title: laboratory.title || '',
                order_index: laboratory.order_index || 0,
            });
        }
    }, [laboratory, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (formData.title.trim() === '') {
            toast.error(t('exercise_management.title_required'));
            setLoading(false);
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const response = await api.put(
                `http://127.0.0.1:8000/api/v1/laboratory/${laboratory.id}`,
                formData,
                {headers: {Authorization: `Bearer ${token}`}}
            );

            if (response.status === 200) {
                toast.success(t('exercise_management.laboratory_update_success'));
                onSuccess();
                onClose();
            }
        } catch (err) {
            const message = getErrorResponseMessage(err);
            toast.error(t(`backend.${message}`) || t('exercise_management.laboratory_update_failure'));
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (!loading) {
            onClose();
        }
    };

    const handleBackdropMouseDown = (e) => {
        setMouseDownTarget(e.target);
    };

    const handleBackdropMouseUp = (e) => {
        if (mouseDownTarget === e.currentTarget && e.target === e.currentTarget && !loading) {
            handleClose();
        }
        setMouseDownTarget(null);
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4"
            onMouseDown={handleBackdropMouseDown}
            onMouseUp={handleBackdropMouseUp}>
            <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[95vh] overflow-y-auto">
                <div
                    className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-slate-900">{t('exercise_management.edit_lab')}</h2>
                    <button
                        onClick={handleClose}
                        disabled={loading}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        <X className="w-5 h-5 text-slate-600"/>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="space-y-5">
                        <div>
                            <label htmlFor="title" className="block text-sm font-semibold text-slate-700 mb-2">
                                {t('common.title')}
                            </label>
                            <input
                                id="title"
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                min="0"
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <label htmlFor="order_index" className="block text-sm font-semibold text-slate-700 mb-2">
                                {t('common.order_index')}
                            </label>
                            <input
                                id="order_index"
                                type="number"
                                value={formData.order_index}
                                onChange={(e) => setFormData({...formData, order_index: parseInt(e.target.value) || 0})}
                                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                min="0"
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 mt-8">
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={loading}
                            className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
                        >
                            {t('common.cancel')}
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin"/>
                                    <span>{t('common.save_loading')}</span>
                                </>
                            ) : (
                                <span>{t('exercise_management.save_exercise')}</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}