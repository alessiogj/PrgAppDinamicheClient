// src/components/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
    return (
        <div className="home-container">
            <h1 className="home-title">Pagina iniziale!</h1>
            <div className="links-container">
                <Link className="home-link" to="/login">Login</Link>
                <Link className="home-link" to="/register">Register</Link>
            </div>
        </div>
    );
};

export default HomePage;
