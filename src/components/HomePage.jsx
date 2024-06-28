import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';
import BackgroundCanvas from './Common/BackgroundCanvas';

const HomePage = () => {
    return (
        <div className="home-container">
            <BackgroundCanvas />
            <h1 className="home-title">Welcome!</h1>
            <div className="links-container">
                <Link className="home-link" to="/login">Login</Link>
            </div>
        </div>
    );
};

export default HomePage;
