import {useState} from 'react';
import {Link, Route, Routes, useLocation} from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import {BookOpen, ClipboardPlus, LayoutDashboard, Menu, Users, X} from 'lucide-react';
import {routes} from "../routes.jsx";
import {useTranslation} from "react-i18next";

const menuItems = [
    {path: '/admin', icon: LayoutDashboard, label: 'dashboard'},
    {path: '/admin/users', icon: Users, label: 'users'},
    {path: '/admin/exercises', icon: BookOpen, label: 'exercises'},
    {path: '/admin/reports', icon: ClipboardPlus, label: 'reports'},
];

export default function AdminLayout() {
    const {t} = useTranslation();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const isActive = (path) => {
        if (path === '/admin') {
            return location.pathname === '/admin';
        }
        return location.pathname.startsWith(path);
    };

    const closeSidebar = () => setSidebarOpen(false);

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar/>

            <div className="flex">
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
                        onClick={closeSidebar}
                    />
                )}

                <aside
                    className={`fixed lg:sticky top-0 left-0 z-50 w-64 bg-white border-r border-slate-200 min-h-[100vh] transform transition-transform duration-300 lg:transform-none ${
                        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    }`}
                >
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                                    {t('admin.admin_panel')}
                                </h2>
                            </div>
                            <button
                                onClick={closeSidebar}
                                className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-slate-600"/>
                            </button>
                        </div>

                        <nav className="space-y-1">
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                const active = isActive(item.path);

                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={closeSidebar}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                                            active
                                                ? 'bg-blue-50 text-blue-700 shadow-sm'
                                                : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                                        }`}
                                    >
                                        <Icon className={`w-5 h-5 ${active ? 'text-blue-600' : 'text-slate-500'}`}/>
                                        <span>{t(`admin.${item.label}`)}</span>
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </aside>

                <main className="flex-1 w-full lg:w-auto">
                    <div className="lg:hidden sticky top-0 bg-white border-b border-slate-200 px-4 py-3 z-30">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="flex items-center gap-2 text-slate-700 hover:text-slate-900 font-medium"
                        >
                            <Menu className="w-5 h-5"/>
                            <span>Menu</span>
                        </button>
                    </div>

                    <div className="p-4 sm:p-6 lg:p-8">
                        <Routes>
                            {routes.map(
                                ({layout, pages}) =>
                                    layout === "admin" &&
                                    pages.map(({path, component}) => (
                                        <Route exact path={path} element={component}/>
                                    )),
                            )}
                        </Routes>
                    </div>
                </main>
            </div>
        </div>
    );
}
