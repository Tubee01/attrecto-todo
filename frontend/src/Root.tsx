import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import Container from '@mui/material/Container';
import LocalizationProvider from "./context/LocalizationContext";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ConfirmationModalContextProvider from "./context/ModalContext";

const theme = createTheme(
    // optional HU locale
    // huHU,
);
function Root() {
    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider>
                <AuthProvider >
                    <ConfirmationModalContextProvider>
                        <BrowserRouter>
                            <CssBaseline />
                            <Container component="main" >
                                <App />
                            </Container>
                        </BrowserRouter>
                    </ConfirmationModalContextProvider>
                </AuthProvider >
            </LocalizationProvider>
        </ThemeProvider >
    );
}

export default Root;