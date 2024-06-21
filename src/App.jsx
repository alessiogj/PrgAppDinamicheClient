// src/App.js
import React from 'react';
import './App.css';
import Navbar from './components/Navbar';

function App() {
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

export default App;
