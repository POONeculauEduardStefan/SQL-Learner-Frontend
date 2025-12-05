import React from 'react';
import {Route, Routes} from "react-router-dom";
import {routes} from "../routes.jsx";
import Navbar from "../components/Navbar.jsx";

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-slate-200">
            <Navbar/>
            <Routes>
                {routes.map(
                    ({layout, pages}) =>
                        layout === "dashboard" &&
                        pages.map(({path, component}) => (
                            <Route exact path={path} element={component}/>
                        )),
                )}
            </Routes>
        </div>
    );
};

export default Dashboard;