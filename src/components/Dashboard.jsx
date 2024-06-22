// src/Dashboard.jsx
import React from 'react';
import '../styles/App.css';
import Navbar from './Common/Navbar';

function Dashboard() {
    return (
        <div className="App">
            <Navbar />
            <header className="App-header">
                <p>
                    Questa è la home page
                </p>
            </header>
        </div>
    );
}

export default Dashboard;
