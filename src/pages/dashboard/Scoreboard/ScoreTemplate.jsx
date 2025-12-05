import React from 'react';
import {Trophy} from "lucide-react";

const ScoreTemplate = ({score}) => {
    let lastScore = null;
    let currentRank = 0;
    const scoresWithRank = score.map((user) => {
        if (user.score !== lastScore) {
            currentRank = currentRank + 1;
            lastScore = user.score;
        }
        return { ...user, rank: currentRank };
    });

    console.log(scoresWithRank);

    const getRankDetails = (rank, index) => {
        const baseRow = 'border-b border-gray-200 transition-colors duration-150';
        switch (rank) {
            case 1:
                return {
                    row: `${baseRow} bg-yellow-50 border-l-4 border-yellow-400`,
                    rankClass: 'text-yellow-600 font-bold',
                    icon: <Trophy className="text-yellow-500 w-5 h-5"/>
                };
            case 2:
                return {
                    row: `${baseRow} bg-gray-100 border-l-4 border-gray-400`,
                    rankClass: 'text-gray-600 font-bold',
                    icon: <Trophy className="text-gray-400 w-5 h-5"/>
                };
            case 3:
                return {
                    row: `${baseRow} bg-orange-50 border-l-4 border-orange-500`,
                    rankClass: 'text-orange-600 font-bold',
                    icon: <Trophy className="text-orange-500 w-5 h-5"/>
                };
            default: {
                const defaultBg = index % 2 === 0
                    ? 'bg-white'
                    : 'bg-gray-50';
                return {
                    row: `${baseRow} ${defaultBg} hover:bg-indigo-50`,
                    rankClass: 'text-gray-700',
                    icon: null
                };
            }
        }
    };

    return (
        <div>
            <div className="rounded-lg overflow-hidden shadow-md">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white">
                    {scoresWithRank.map((user, index) => {
                        const details = getRankDetails(user.rank,index);
                        return (
                            <tr key={index} className={details.row}>
                                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-center ${details.rankClass}`}>
                                    {user.rank}
                                </td>
                                <td className="flex px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                    {details.icon}
                                    <span className="ml-2 align-middle font-medium">{user.username}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold text-indigo-600">
                                    {user.score.toLocaleString()}
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ScoreTemplate;