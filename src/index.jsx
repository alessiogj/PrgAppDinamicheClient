// src/index.jsx
import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import HomePage from './components/HomePage/HomePage';
import ProtectedRoute from './Auth/ProtectedRoute';
import {createRoot} from "react-dom/client";
import {SnackbarProvider} from "notistack";


const root = createRoot(
    document.getElementById('root')
);

root.render(
    <SnackbarProvider maxSnack={3}>  {}
        <Router>
        <Routes>
            <Route path="/login" element={<HomePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            }/>
            {}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </Router>
    </SnackbarProvider>
);