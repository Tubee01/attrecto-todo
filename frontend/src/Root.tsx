import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";

function Root() {
    return (
        <AuthProvider >
            <BrowserRouter>
                <CssBaseline />
                <App />
            </BrowserRouter>
        </AuthProvider>
    );
}

export default Root;