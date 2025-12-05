import SignIn from "./pages/auth/SignIn.jsx";
import SignUp from "./pages/auth/SignUp.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/dashboard/Profile/Profile.jsx";
import NotFoundPage from "./pages/dashboard/NotFoundPage.jsx";
import AdminDashboard from "./pages/admin/Dashboard/AdminDashboard.jsx";
import UsersManagement from "./pages/admin/Users/UsersManagement.jsx";
import ExercisesManagement from "./pages/admin/Exercises/ExerciseManagement.jsx";
import Laboratories from "./pages/dashboard/Laboratories/Laboratories.jsx";
import Practice from "./pages/dashboard/Practice/Practice.jsx";
import Scoreboard from "./pages/dashboard/Scoreboard/Scoreboard.jsx";
import ReportsManagement from "./pages/admin/Reports/ReportsManagement.jsx";
import ResetPassword from "./pages/auth/ResetPassword.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";
import ConfirmEmail from "./pages/auth/ConfirmEmail.jsx";

export const routes = [
    {
        layout: "dashboard",
        pages: [
            {
                name: "Home",
                path: "/home",
                component: <Home/>,
            },
            {
                name: "Profile",
                path: "/profile",
                component: <Profile/>,
            },
            {
                name: "Laboratories",
                path: "/laboratories",
                component: <Laboratories/>,
            },
            {
                name: "Practice",
                path: "/practice",
                component: <Practice/>,
            },
            {
                name: "Scoreboard",
                path: "/scoreboard",
                component: <Scoreboard/>,
            },
            {
                name: "NotFoundPage",
                path: "/not-found",
                component: <NotFoundPage/>,
            }
        ]
    },
    {
        layout: "admin",
        pages: [
            {
                name: "Home",
                path: "/",
                component: <AdminDashboard/>,
            },
            {
                name: "Users",
                path: "/users",
                component: <UsersManagement/>,
            },
            {
                name: "Exercises",
                path: "/exercises",
                component: <ExercisesManagement/>,
            },
            {
                name: "Reports",
                path: "/reports",
                component: <ReportsManagement/>,
            }
        ]
    },
    {
        layout: "auth",
        pages: [
            {
                name: "sign in",
                path: "/sign-in",
                element: <SignIn/>
            },
            {
                name: "sign up",
                path: "/sign-up",
                element: <SignUp/>
            },
            {
                name: "forgot password",
                path: "/forgot-password",
                element: <ForgotPassword/>
            },
            {
                name: "reset password",
                path: "/reset-password/:token",
                element: <ResetPassword/>
            },
            {
                name: "confirm email",
                path: "/confirm-email/:token",
                element: <ConfirmEmail/>
            },
        ]
    },
    {
        layout: "landing",
        pages: [
            {
                name: "Home",
                path: "/home",
                component: <Home/>,
            }
        ]
    }
]