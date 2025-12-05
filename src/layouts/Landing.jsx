import React from 'react';
import {Route, Routes} from "react-router-dom";
import {routes} from "../routes.jsx";
import Navbar from "../components/Navbar.jsx";
import {useUser} from "../context/LoginRequired.jsx";

const Landing = () => {
    const user = useUser();
    return (
        <div className="min-h-screen bg-slate-200">
            {user && user.userId && <Navbar/>}
            <Routes>
                {routes.map(
                    ({layout, pages}) =>
                        layout === "landing" &&
                        pages.map(({path, component}) => (
                            <Route exact path={path} element={component}/>
                        )),
                )}
            </Routes>
        </div>
    );
};

export default Landing;