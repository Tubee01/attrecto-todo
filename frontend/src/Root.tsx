import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import Container from '@mui/material/Container';
import LocalizationProvider from "./context/LocalizationContext";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { huHU } from '@mui/material/locale';
import { ConfirmProvider } from "./context/ConfirmContext";

const theme = createTheme(
    // optional HU locale
    // huHU,
);
function Root() {
    return (
        <ThemeProvider theme={theme}>
            <AuthProvider >
                <ConfirmProvider>
                    <LocalizationProvider>
                        <BrowserRouter>
                            <CssBaseline />
                            <Container component="main" >
                                <App />
                            </Container>
                        </BrowserRouter>
                    </LocalizationProvider>
                </ConfirmProvider>
            </AuthProvider >
        </ThemeProvider >
    );
}

export default Root;