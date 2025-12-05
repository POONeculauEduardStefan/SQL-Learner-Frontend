import React from 'react';
import {Route, Routes} from "react-router-dom";
import {routes} from "../routes.jsx";

const Auth = () => {
    return (
        <div className="min-h-screen bg-slate-950 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-slate-950 to-emerald-600/20"></div>

            <div className="relative min-h-screen flex flex-col lg:flex-row">
                <div className="flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-12">
                    <div className="w-full max-w-md">
                        <Routes>
                            {routes.map(
                                ({layout, pages}) =>
                                    layout === "auth" &&
                                    pages.map(({path, element}) => (
                                        <Route exact path={path} element={element}/>
                                    )),
                            )}
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;