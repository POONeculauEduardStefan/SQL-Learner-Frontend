import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {CheckCircle, Eye, EyeOff, Lock, Mail, User} from 'lucide-react';
import {toast} from "react-toastify";
import api from "../../services/api.js";
import {getErrorResponseMessage} from "../../utils/responses.jsx";
import {useTranslation} from "react-i18next";

export default function SignUp() {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const validatePassword = (pw) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{8,}$/.test(pw);
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!email || !lastName || !firstName || !password || !confirmPassword) {
            toast.error(t('common.please_fill_all_fields'));
            setLoading(false);
            return;
        }
        if (password !== confirmPassword) {
            toast.error(t('error.password_match'));
            setLoading(false);
            return;
        }

        if (!validatePassword(password)) {
            toast.error(t('error.password_requirements'));
            setLoading(false);
            return;
        }

        try {
            const language = localStorage.getItem("i18nextLng") || "en";
            const response = await api.post("/api/v1/auth/register", {
                email,
                first_name: firstName,
                last_name: lastName,
                password,
                language,
            })
            if (response.status === 201) {
                toast.success(t('auth.check_email_verify'));
                navigate("/login");
            }
        } catch (err) {
            const message = getErrorResponseMessage(err)
            const translatedMessage = t(`backend.${message}`);
            toast.error(translatedMessage || t('auth.failed_register'));
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            className="bg-slate-900/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-800/50 p-6 sm:p-8 md:p-10">
            <div className="mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">{t('sign_up.create_account')}</h2>
                <p className="text-slate-400">{t('sign_up.continue')}</p>
            </div>

            <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-slate-300 mb-2">
                        {t('common.first_name')}
                    </label>
                    <div className="relative group">
                        <User
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors"/>
                        <input
                            id="firstName"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:bg-slate-800 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                            placeholder="John"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-slate-300 mb-2">
                        {t('common.last_name')}
                    </label>
                    <div className="relative group">
                        <User
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors"/>
                        <input
                            id="lastName"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:bg-slate-800 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                            placeholder="Doe"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                        {t('common.email')}
                    </label>
                    <div className="relative group">
                        <Mail
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors"/>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:bg-slate-800 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                            placeholder="your@email.com"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                        {t('common.password')}
                    </label>
                    <div className="relative group">
                        <Lock
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors"/>
                        <input
                            id="password"
                            type={isPasswordVisible ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:bg-slate-800 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                            placeholder="••••••••"
                            required
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
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300 mb-2">
                        {t('common.confirm_password')}
                    </label>
                    <div className="relative group">
                        <Lock
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors"/>
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:bg-slate-800 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                            placeholder="••••••••"
                            required
                        />
                        {password && confirmPassword && password === confirmPassword && (
                            <CheckCircle
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400"/>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold py-3.5 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-blue-500/25 cursor-pointer"
                >
                    {loading ? t('sign_up.creating_account') : t('sign_up.create_account')}
                </button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-slate-400 text-sm">
                    {t('auth.already_have_account')}{' '}
                    <Link to="/dashboard/sign-in"
                          className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                        {t('auth.sign_in')}
                    </Link>
                </p>
            </div>
        </div>
    );
}
