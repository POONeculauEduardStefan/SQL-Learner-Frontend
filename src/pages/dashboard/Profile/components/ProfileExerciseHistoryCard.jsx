import React from 'react';

const ProfileExerciseHistoryCard = ({history}) => {
    return (
        <>
            <div className="flex flex-col">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800">
                        {history.response}
                    </h3>
                    <p className="text-gray-600">
                    <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${history.success ? 'text-green-600' : 'text-red-600'}`}>
                                                        {history.success ? 'Success' : 'Failed'}

                    </span>
                    </p>
                </div>
                <p className="text-gray-600">
                    Submitted on: <span
                    className="">{new Date(history.created_at).toLocaleDateString()}</span>
                </p>
            </div>
        </>
    );
};

export default ProfileExerciseHistoryCard;