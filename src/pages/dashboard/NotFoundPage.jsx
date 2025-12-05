import React from 'react';
import {Card} from "@material-tailwind/react";

const NotFoundPage = () => {
    return (
            <div className="flex flex-col w-full items-center justify-center min-h-screen bg-slate-200">
                <h1 className="text-6xl font-bold text-slate-800 mb-4">404</h1>
                <p className="text-xl text-gray-700">Page Not Found</p>
            </div>
    );
};

export default NotFoundPage;
