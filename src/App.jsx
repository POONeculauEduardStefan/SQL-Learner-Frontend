import '../public/css/tailwind.css'
import {Navigate, Route, Routes} from "react-router-dom";
import LoginRequired from "./context/LoginRequired.jsx";
import Dashboard from "./layouts/Dashboard.jsx";
import Auth from "./layouts/Auth.jsx";
import AdminRequired from "./context/AdminRequired.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import ProtectedAuth from "./context/ProtectedAuth.jsx";
import Landing from "./layouts/Landing.jsx";

function App() {

    return (
        <Routes>
            <Route element={<LoginRequired/>}>
                <Route path="/dashboard/*" element={<Dashboard/>}/>
            </Route>
            <Route element={<AdminRequired/>}>
                <Route path="/admin/*" element={<AdminLayout/>}/>
            </Route>
            <Route element={<ProtectedAuth/>}>
                <Route path="/auth/*" element={<Auth/>}/>
            </Route>
            <Route>
                <Route path="/landing/*" element={<Landing/>}/>
            </Route>
            <Route path="*" element={<Navigate to="/dashboard/home" replace/>}/>
        </Routes>
    )
}

export default App
