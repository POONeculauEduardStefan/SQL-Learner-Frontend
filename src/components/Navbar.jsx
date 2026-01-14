import {Link, useNavigate} from 'react-router-dom';
import {Book, Database, Folder, LogOut, LucideShieldUser, Pen, Trophy, User} from 'lucide-react';
import {useUser} from "../context/LoginRequired"
import {useIsAdmin} from "../utils/checkAdmin.jsx";
import {useTranslation} from 'react-i18next';

export default function Navbar() {
    const {t, i18n} = useTranslation();
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
                    <div className="flex items-center gap-2">
                        {(isAdmin || (user && user.userId)) && <Link
                            to="/dashboard/laboratories"
                            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-2 py-2 rounded-lg transition-colors"
                        >
                            <Folder className="w-4 h-4"/>
                        </Link>}
                        {(isAdmin || (user && user.userId)) && <Link
                            to="/dashboard/courses"
                            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-2 py-2 rounded-lg transition-colors"
                        >
                            <Book className="w-4 h-4"/>
                        </Link>}
                        {(isAdmin || (user && user.userId)) && <Link
                            to="/dashboard/practice"
                            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-2 py-2 rounded-lg transition-colors"
                        >
                            <Pen className="w-4 h-4"/>
                        </Link>}

                        <div className="flex items-center gap-2 ml-2 pl-4 border-l border-slate-700">
                            <Link
                                to="/dashboard/profile"
                                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-1 py-2 rounded-lg transition-colors"
                            >
                                <User className="w-4 h-4"/>
                            </Link>
                            {(isAdmin || (user && user.userId)) && (
                                <Link
                                    to="/dashboard/scoreboard"
                                    className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-1 py-2 rounded-lg transition-colors"
                                >
                                    <Trophy className="w-4 h-4"/>
                                </Link>
                            )}
                            {isAdmin && <Link
                                to="/admin"
                                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-1 py-2 rounded-lg transition-colors"
                            >
                                <LucideShieldUser className="w-4 h-4"/>
                            </Link>}
                            {(isAdmin || (user && user.userId)) && <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-1 py-2 rounded-lg transition-colors cursor-pointer"
                            >
                                <LogOut className="w-4 h-4"/>
                            </button>}
                            <select
                                className="bg-slate-800 text-white px-2 py-2 rounded-lg hover:bg-slate-700 transition-colors"
                                value={i18n.language}
                                onChange={(e) => i18n.changeLanguage(e.target.value)}
                            >
                                <option value="ro">🇷🇴</option>
                                <option value="en">🇬🇧</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
