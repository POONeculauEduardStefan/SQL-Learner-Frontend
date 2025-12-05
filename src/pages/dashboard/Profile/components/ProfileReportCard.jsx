import React from 'react';
import {getStatusColor, getStatusIcon} from "../../../../utils/statusIcon.jsx";

const ProfileReportCard = ({report}) => {
    return (
        <>
            <div className="flex flex-col">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800">
                        Report request: {report.title}
                    </h3>
                    <p className="text-gray-600">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${getStatusColor(report.status)}`}>
                        {getStatusIcon(report.status)}
                    </span>
                    </p>
                </div>
                <p className="text-gray-600">
                    Submitted on: <span
                    className="">{new Date(report.created_at).toLocaleDateString()}</span>
                </p>
            </div>
        </>
    );
};

export default ProfileReportCard;