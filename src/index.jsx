// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import HomePage from './components/HomePage';
import ProtectedRoute from './components/Auth/ProtectedRoute';

ReactDOM.render(
    <Router>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            }/>
            {}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </Router>,
    document.getElementById('root')
);
