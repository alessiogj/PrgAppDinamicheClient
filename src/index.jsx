import React from 'react';
import { createRoot } from 'react-dom/client';
import { SnackbarProvider } from 'notistack';
import App from './App';

const root = createRoot(document.getElementById('root'));

root.render(
    <SnackbarProvider maxSnack={3}>
        <App />
    </SnackbarProvider>
);
