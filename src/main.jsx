import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";
import {ToastContainer} from "react-toastify";

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
            <App/>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
    </BrowserRouter>
)
