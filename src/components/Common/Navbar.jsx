import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Navbar.css';

function Navbar() {
    return (
        <nav id="navbar">
            <ul className="navbar-items">
                <li className="navbar-item">
                    <Link className="navbar-item-inner" to="/dashboard">
                        <div className="navbar-item-inner-icon-wrapper">
                            <i className="fas fa-chart-line"></i>
                        </div>
                        <span className="link-text">Statistics</span>
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link className="navbar-item-inner" to="/dashboard">
                        <div className="navbar-item-inner-icon-wrapper">
                            <i className="fas fa-bell"></i>
                        </div>
                        <span className="link-text">Recent Activities</span>
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link className="navbar-item-inner" to="/dashboard">
                        <div className="navbar-item-inner-icon-wrapper">
                            <i className="fas fa-link"></i>
                        </div>
                        <span className="link-text">Quick Links</span>
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link className="navbar-item-inner" to="/dashboard">
                        <div className="navbar-item-inner-icon-wrapper">
                            <i className="fas fa-search"></i>
                        </div>
                        <span className="link-text">Manage Orders</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
