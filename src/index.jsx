import React from 'react';
import { createRoot } from 'react-dom/client';
import { SnackbarProvider } from 'notistack';
import App from './App';
import theme from './Theme';
import {ThemeProvider} from "@mui/material";

const root = createRoot(document.getElementById('root'));

//punto di ingresso per la configurazione
//dell'applicazione React
root.render(
    <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
            <App />
        </SnackbarProvider>
    </ThemeProvider>
);
