import React from 'react';
import '../../styles/Navbar.css';
import '../../styles/App.css';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav id="navbar">
            <ul className="navbar-items">
                { /* Each item now uses a Link component for proper navigation */ }
                <li className="navbar-item">
                    <Link className="navbar-item-inner" to="/dashboard">
                        <div className="navbar-item-inner-icon-wrapper">
                            <ion-icon name="search-outline"></ion-icon>
                        </div>
                        <span className="link-text">Ordini</span>
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link className="navbar-item-inner" to="/dashboard">
                        <div className="navbar-item-inner-icon-wrapper">
                            <ion-icon name="home-outline"></ion-icon>
                        </div>
                        <span className="link-text">Home</span>
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link className="navbar-item-inner" to="/dashboard">
                        <div className="navbar-item-inner-icon-wrapper">
                            <ion-icon name="folder-open-outline"></ion-icon>
                        </div>
                        <span className="link-text">Profilo</span>
                    </Link>
                </li>
                {}
            </ul>
        </nav>
    );
}

export default Navbar;
