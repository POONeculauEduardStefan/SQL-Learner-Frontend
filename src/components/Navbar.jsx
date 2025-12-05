import {Link, useNavigate} from 'react-router-dom';
import {Database, LogOut, LucideShieldUser, Trophy, User} from 'lucide-react';
import {useUser} from "../context/LoginRequired"
import {useIsAdmin} from "../utils/checkAdmin.jsx";

export default function Navbar() {
    const navigate = useNavigate();
    const user = useUser();
    const isAdmin = useIsAdmin();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate('/sign-in');
    };

    return (
        <nav className="bg-slate-900 border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-1 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/dashboard/home"
                          className="flex items-center ml-2 text-white hover:text-blue-400 transition-colors">
                        <Database className="w-6 h-6"/>
                    </Link>

                    {<div className="flex items-center gap-2">
                        {user && user.userId && <Link
                            to="/dashboard/laboratories"
                            className="text-slate-300 hover:text-white transition-colors font-medium"
                        >
                            Labs
                        </Link>}
                        {user && user.userId && <Link
                            to="/dashboard/practice"
                            className="text-slate-300 hover:text-white transition-colors font-medium"
                        >
                            Practice
                        </Link>}

                        <div className="flex items-center gap-2 ml-4 pl-4 border-l border-slate-700">
                            (
                            <Link
                                to="/dashboard/profile"
                                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-2 py-2 rounded-lg transition-colors"
                            >
                                <User className="w-4 h-4"/>
                            </Link>
                            )
                            {user && user.userId && (
                                <Link
                                    to="/dashboard/scoreboard"
                                    className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-2 py-2 rounded-lg transition-colors"
                                >
                                    <Trophy className="w-4 h-4"/>
                                </Link>
                            )}
                            {isAdmin && <Link
                                to="/admin"
                                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-2 py-2 rounded-lg transition-colors"
                            >
                                <LucideShieldUser className="w-4 h-4"/>
                            </Link>}
                            {user && user.userId && <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-2 py-2 rounded-lg transition-colors cursor-pointer"
                            >
                                <LogOut className="w-4 h-4"/>
                            </button>}
                        </div>
                    </div>}
                </div>
            </div>
        </nav>
    );
}
