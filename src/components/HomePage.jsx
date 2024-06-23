// src/components/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
    return (
        <div className="home-container">
            <h1 className="home-title">Welcome!</h1> {/* Modifica del testo del titolo per adattarlo al nuovo stile */}
            <div className="links-container">
                {/* Link per la navigazione */}
                <Link className="home-link" to="/login">Login</Link>
                <Link className="home-link" to="/register">Register</Link>
            </div>
        </div>
    );
};

export default HomePage;
