import {AlertCircle, CheckCircle, Clock} from "lucide-react";

export const getStatusIcon = (status) => {
    switch (status) {
        case 'open':
            return <AlertCircle className="w-4 h-4"/>;
        case 'in_progress':
            return <Clock className="w-4 h-4"/>;
        case 'resolved':
            return <CheckCircle className="w-4 h-4"/>;
        default:
            return null;
    }
};
export const getStatusColor = (status) => {
    switch (status) {
        case 'open':
            return 'bg-red-100 text-red-700';
        case 'in_progress':
            return 'bg-amber-100 text-amber-700';
        case 'resolved':
            return 'bg-green-100 text-green-700';
        default:
            return 'bg-slate-100 text-slate-700';
    }
};