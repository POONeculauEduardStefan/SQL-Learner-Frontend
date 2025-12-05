import React, {useEffect, useState} from 'react';
import {ArrowLeft, ArrowRight, Calendar, Delete, Mail, Search, Trash, User, UserCheck, UserStar} from 'lucide-react';
import api from "../../../services/api.tsx";
import {toast} from "react-toastify";
import {getErrorResponseMessage, getSuccessData} from "../../../utils/responses.jsx";
import DeleteEntityModal from "../../DeleteEntityModal.jsx";
import PromoteAdminModal from "./PromoteAdminModal.jsx";

const USER_PER_PAGE = 5;

export default function UsersManagement() {
    const [searchQuery, setSearchQuery] = useState('');
    const [usersData, setUsersData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);
    const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false);
    const [isAdminOpen, setIsAdminOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const getAllUsers = async (page = 1, query = '') => {
        const token = localStorage.getItem("token");
        try {
            const response = await api.post("http://127.0.0.1:8000/api/v1/admin/users/paginated", {
                users_per_page: USER_PER_PAGE,
                current_page: page,
                search_query: query,
            }, {
                headers: {Authorization: `Bearer ${token}`},
            });
            const data = getSuccessData(response);
            console.log(data)
            setUsersData(data.users);
            setTotalPages(data.total_pages);
            setTotalUsers(data.total);
            setCurrentPage(page);
        } catch (e) {
            const message = getErrorResponseMessage(e) || "Failed to fetch users";
            toast.error(message);
        }
    }

    useEffect(() => {
        getAllUsers(1, '');
    }, []);

    const handleSearch = () => {
        getAllUsers(1, searchQuery);
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            getAllUsers(currentPage + 1, searchQuery);
        }
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            getAllUsers(currentPage - 1, searchQuery);
        }
    }

    const handleGoToPage = (pageNumber) => {
        getAllUsers(pageNumber, searchQuery);
    }

    const clearSearch = () => {
        setSearchQuery('');
        getAllUsers(1, '');
    }

    const getPaginationPages = () => {
        const pages = new Set();

        pages.add(1);

        if (currentPage > 1) pages.add(currentPage - 1);
        pages.add(currentPage);
        if (currentPage < totalPages) pages.add(currentPage + 1);

        if (totalPages > 1) pages.add(totalPages);

        return Array.from(pages).sort((a, b) => a - b);
    }

    const paginationPages = getPaginationPages();

    const deleteUser = async (userId) => {
        console.log(userId);
        const token = localStorage.getItem("token");
        try {
            const response = await api.delete(`http://127.0.0.1:8000/api/v1/admin/users/${userId}`, {
                headers: {Authorization: `Bearer ${token}`},
            });
            if (response.status === 204) {
                setUsersData(usersData.filter(user => user.id !== userId));
                toast.success("User deleted successfully");
                if (usersData.length === 1 && currentPage > 1) {
                    await getAllUsers(currentPage - 1, searchQuery);
                } else {
                    await getAllUsers(currentPage, searchQuery);
                }
            }
        } catch (e) {
            console.error(e);
            const message = getErrorResponseMessage(e) || "Failed to delete user";
            toast.error(message);
        }
    }

    const handleCloseIsAdmin = async () => {
        setIsAdminOpen(false);
        await getAllUsers(currentPage, searchQuery);
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Users Management</h1>
                <p className="text-slate-600">View and manage all platform users</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
                <div className="flex items-center gap-2">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            placeholder="Search users by name or email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            className="w-full pl-3 pr-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>
                    <button
                        onClick={handleSearch}
                        className="border-1 p-2 rounded-xl border-slate-300 hover:ring-2 hover:ring-blue-500 hover:border-transparent outline-none transition-all cursor-pointer"
                    >
                        <Search className="w-5 h-5 text-slate-400"/>
                    </button>
                    <button
                        onClick={clearSearch}
                        className="border-1 p-2 border-slate-300 rounded-xl hover:ring-2 hover:ring-red-500 hover:border-transparent outline-none transition-all cursor-pointer"
                    >
                        <Delete className="w-5 h-5 text-red-600"/>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-emerald-100 rounded-xl">
                            <UserCheck className="w-6 h-6 text-emerald-600"/>
                        </div>
                        <div>
                            <p className="text-sm text-slate-600">Total Users</p>
                            <p className="text-2xl font-bold text-slate-900">{totalUsers}</p>
                        </div>
                    </div>
                </div>
            </div>

            {usersData.length === 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-2">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <div className="flex items-center gap-4">
                            <div>
                                <p className="text-slate-500 mx-auto">No users found matching your criteria</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {usersData && usersData.length > 0 &&
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto min-h-[420px]">
                        <table className="w-full">
                            <thead>
                            <tr className="border-b border-slate-200 bg-slate-50">
                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700 w-[30%]">User</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700 w-[30%]">Name</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700 w-[30%]">Joined</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700 w-[10%]">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {usersData.map((user) => (
                                <tr key={user.id}
                                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                                                {user.image ? <img
                                                    src={`data:image/jpeg;base64,${user.image}`}
                                                    alt="Profile"
                                                    className="w-10 h-10 rounded-full object-cover border-indigo-50 shadow-sm"
                                                /> : (user.first_name && user.last_name ?
                                                    user.first_name?.charAt(0) + user.last_name?.charAt(0) :
                                                    <User className="w-5 h-5"/>)
                                                }
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-900">{user.name}</p>
                                                <p className="text-sm text-slate-500 flex items-center gap-1">
                                                    <Mail className="w-3 h-3"/>
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-600 flex items-center gap-1">
                                            <User className={`w-5 h-5 ${user.role === 1 ? "text-green-600" : ''}`}/>
                                            {user.first_name} {user.last_name}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-600 flex items-center gap-1">
                                            <Calendar className="w-3 h-3"/>
                                            {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                                        </span>
                                    </td>
                                    <td className="flex flex-row px-6 py-4">
                                        <button
                                            className="p-2 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                                            onClick={() => {
                                                setSelectedUserId(user.id)
                                                setIsDeleteUserOpen(true)
                                            }}
                                        >
                                            <Trash className="w-5 h-5 text-red-600"/>
                                        </button>
                                        {
                                            user.role !== 1 && (
                                                <button
                                                    className="p-2 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                                                    onClick={() => {
                                                        setSelectedUserId(user.id)
                                                        setIsAdminOpen(true)
                                                    }}
                                                >
                                                    <UserStar className="w-5 h-5 text-yellow-600"/>
                                                </button>
                                            )
                                        }
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <DeleteEntityModal
                            isOpen={isDeleteUserOpen}
                            onClose={() => setIsDeleteUserOpen(false)}
                            deleteEntity={deleteUser}
                            entityId={selectedUserId}
                            entityName={"User"}
                        />
                        <PromoteAdminModal
                            isOpen={isAdminOpen}
                            onClose={() => handleCloseIsAdmin()}
                            userId={selectedUserId}
                        />
                    </div>
                    {usersData.length > 0 && totalPages > 1 && (
                        <div className="flex gap-2 justify-center items-center py-4">
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 px-3 py-2 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="w-2 h-3"/>
                            </button>

                            {paginationPages.map((page, index, arr) => (
                                <div key={page} className="flex items-center gap-1">
                                    <button
                                        onClick={() => handleGoToPage(page)}
                                        className={`px-3 py-2 rounded-lg font-semibold transition-colors ${
                                            currentPage === page
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                    {index < arr.length - 1 && arr[index + 1] !== page + 1 && (
                                        <span className="text-slate-500">...</span>
                                    )}
                                </div>
                            ))}

                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 px-3 py-2 rounded-lg transition-colors"
                            >
                                <ArrowRight className="w-2 h-3"/>
                            </button>
                        </div>
                    )}
                </div>}
        </div>
    );
}