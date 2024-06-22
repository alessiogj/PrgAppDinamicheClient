// src/components/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div>
            <h1>Pagina iniziale!</h1>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </div>
    );
};

export default HomePage;
