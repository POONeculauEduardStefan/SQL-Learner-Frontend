import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {toast} from "react-toastify";
import api from "../../services/api.js";
import {Mail} from 'lucide-react';
import {getErrorResponseMessage} from "../../utils/responses.jsx";


const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!email) {
            toast.error("Please fill in all fields");
            return;
        }
        try {
            const response = await api.post("/api/v1/auth/forgot-password", {
                email: email,
            })
            if (response.status === 200) {
                toast.success("Password reset link sent to your email!");
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
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">Welcome Back</h2>
                <p className="text-slate-400">Sign in to continue your SQL journey</p>
            </div>

            <form onSubmit={handleSignIn} className="space-y-5">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                        Email Address
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

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-8 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold py-3.5 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-blue-500/25 cursor-pointer"
                >
                    {loading ? 'Signing In...' : 'Sign In'}
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

export default ForgotPassword;