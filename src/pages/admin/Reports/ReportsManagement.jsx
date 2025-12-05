import React, {useEffect, useState} from 'react';
import {MessageSquare} from 'lucide-react';
import api from "../../../services/api.tsx";
import {getErrorResponseMessage, getSuccessData} from "../../../utils/responses.jsx";
import {toast} from "react-toastify";
import EditReportModal from "./components/EditReportModal.jsx";
import ReportCard from "./components/ReportCard.jsx";
import ReportStats from "./components/ReportStats.jsx";
import ReportFilter from "./components/ReportFilter.jsx";
import DeleteEntityModal from "../../DeleteEntityModal.jsx";

export default function ReportsManagement() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [expandedReportId, setExpandedReportId] = useState(null);
    const [selectedReport, setSelectedReport] = useState(null);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [isDeleteReportOpen, setIsDeleteReportOpen] = useState(false);
    const [selectedReportId, setSelectedReportId] = useState(null);
    const [statusFormData, setStatusFormData] = useState({
        status: 'open',
        solution: '',
    });

    useEffect(() => {
        loadReports();
    }, []);

    const loadReports = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await api.get('http://localhost:8000/api/v1/report', {
                headers: {Authorization: `Bearer ${token}`},
            });
            if (response.status === 200) {
                const data = getSuccessData(response).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setReports(data);
            }
        } catch (error) {
            const message = getErrorResponseMessage(error);
            toast.error(message || 'Failed to fetch reports.');
        } finally {
            setLoading(false);
        }
    }

    const handleUpdateReport = async () => {
        if (!selectedReport) return;
        if(statusFormData.status === 'resolved' && !statusFormData.solution.trim()) {
            toast.error('Please provide a solution when marking the report as resolved.');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            const response = await api.put(`http://localhost:8000/api/v1/report`, {
                report_id: selectedReport.id,
                status: statusFormData.status,
                solution: statusFormData.solution,
            }, {
                headers: {Authorization: `Bearer ${token}`},
            });
            if (response.status === 200) {
                const data = getSuccessData(response);
                console.log(data);
                toast.success('Report updated successfully.');
            }
            setShowStatusModal(false);
            setSelectedReport(null);
            setStatusFormData({status: 'open', solution: ''});
            await loadReports();
        } catch (err) {
            console.error('Error updating report:', err);
        }
    };

    const handleDeleteReport = async (reportId) => {
        try {
            const response = await api.delete(`http://localhost:8000/api/v1/report/${reportId}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
            });
            if (response.status === 204) {
                toast.success('Report deleted successfully.');
                await loadReports();
            }
        } catch (err) {
            const message = getErrorResponseMessage(err);
            toast.error(message || 'Failed to delete report.');
        }
    };

    const filteredReports = reports.filter(report => {
        const matchesSearch =
            report.request.toLowerCase().includes(searchQuery.toLowerCase()) ||
            report.exercise_id.toString().includes(searchQuery) ||
            report.added_by_email.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = filterStatus === 'all' || report.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    const stats = {
        total: reports.length,
        open: reports.filter(r => r.status === 'open').length,
        in_progress: reports.filter(r => r.status === 'in_progress').length,
        resolved: reports.filter(r => r.status === 'resolved').length,
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Reports Management</h1>
                <p className="text-slate-600">View and manage user-submitted reports</p>
            </div>

            <ReportStats stats={stats}/>
            <ReportFilter searchQuery={searchQuery}
                          setSearchQuery={setSearchQuery}
                          filterStatus={filterStatus}
                          setFilterStatus={setFilterStatus}
            />

            {filteredReports.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
                    <MessageSquare className="w-12 h-12 text-slate-400 mx-auto mb-4"/>
                    <p className="text-slate-500">No reports found matching your criteria</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {filteredReports.map((report,index) => <ReportCard
                        key={index}
                        report={report}
                        setExpandedReportId={setExpandedReportId}
                        expandedReportId={expandedReportId}
                        setSelectedReport={setSelectedReport}
                        setStatusFormData={setStatusFormData}
                        setShowStatusModal={setShowStatusModal}
                        handleDeleteReport={handleDeleteReport}
                        setIsDeleteReportOpen={setIsDeleteReportOpen}
                        setSelectedReportId={setSelectedReportId}
                    />)}
                </div>
            )}

            {showStatusModal && selectedReport &&
                <EditReportModal
                    isOpen={showStatusModal}
                    onClose={() => {
                        setShowStatusModal(false);
                        setSelectedReport(null);
                        setStatusFormData({status: 'open', solution: ''});
                    }}
                    statusFormData={statusFormData}
                    setStatusFormData={setStatusFormData}
                    handleUpdateReport={handleUpdateReport}
                />}
            {
                isDeleteReportOpen && (
                    <DeleteEntityModal
                        isOpen={isDeleteReportOpen}
                        onClose={() => setIsDeleteReportOpen(false)}
                        entityName="report"
                        deleteEntity={handleDeleteReport}
                        entityId={selectedReportId}
                    />
                )
            }
        </div>
    );
}
