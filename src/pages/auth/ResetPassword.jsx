import React, {useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {toast} from "react-toastify";
import api from "../../services/api.js";
import {Eye, EyeOff, Lock} from 'lucide-react';
import {getErrorResponseMessage} from "../../utils/responses.jsx";


const ResetPassword = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const {token} = useParams();
    const validatePassword = (pw) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{8,}$/.test(pw);
    }

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);

        if(!token) {
            toast.error("Invalid or missing token");
            return;
        }
        if (!password || !confirmPassword) {
            toast.error("Please fill in all fields");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (!validatePassword(password)) {
            toast.error("Password must be at least 8 characters long, contain 1 uppercase letter, 1 number, and 1 special character");
            setLoading(false);
            return;
        }

        try {
            const response = await api.post("/api/v1/auth/reset-password", {
                secret_token: token,
                new_password: password,
            })
            if (response.status === 200) {
                toast.success("Password reset successfully");
                navigate("/")
            }
        } catch (error) {
            const message = getErrorResponseMessage(error);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            className="bg-slate-900/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-800/50 p-6 sm:p-8 md:p-10">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Reset Your Password</h2>
                <p className="text-slate-400">Enter your token and new password to reset your account password.</p>
            </div>

            <form onSubmit={handleResetPassword} className="space-y-5">
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                        Password
                    </label>
                    <div className="relative group">
                        <Lock
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors"/>
                        <input
                            id="password"
                            type={isPasswordVisible ? "text" : "password"}
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
                        Confirm Password
                    </label>
                    <div className="relative group">
                        <Lock
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors"/>
                        <input
                            id="confirmPassword"
                            type={isConfirmPasswordVisible ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:bg-slate-800 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                            placeholder="••••••••"
                            required
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

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-8 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold py-3.5 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-blue-500/25 cursor-pointer"
                >
                    {loading ? 'Resetting...' : 'Reset Password'}
                </button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-slate-400 text-sm">
                    Don't have an account?{' '}
                    <Link to="/auth/sign-up"
                          className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ResetPassword;