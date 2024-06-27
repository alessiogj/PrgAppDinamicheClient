import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/Navbar.css';

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/login');
    };

    return (
        <nav id="navbar">
            <ul className="navbar-items">
                <li className="navbar-item">
                    <Link className="navbar-item-inner" to="/statistics">
                        <div className="navbar-item-inner-icon-wrapper">
                            <i className="fas fa-chart-line"></i>
                        </div>
                        <span className="link-text">Statistics</span>
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link className="navbar-item-inner" to="/recent-activities">
                        <div className="navbar-item-inner-icon-wrapper">
                            <i className="fas fa-bell"></i>
                        </div>
                        <span className="link-text">Recent Activities</span>
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link className="navbar-item-inner" to="/quick-links">
                        <div className="navbar-item-inner-icon-wrapper">
                            <i className="fas fa-link"></i>
                        </div>
                        <span className="link-text">Quick Links</span>
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link className="navbar-item-inner" to="/manage-orders">
                        <div className="navbar-item-inner-icon-wrapper">
                            <i className="fas fa-search"></i>
                        </div>
                        <span className="link-text">Manage Orders</span>
                    </Link>
                </li>
                <li className="navbar-item">
                    <button className="navbar-item-inner" onClick={handleLogout}>
                        <div className="navbar-item-inner-icon-wrapper">
                            <i className="fas fa-sign-out-alt"></i>
                        </div>
                        <span className="link-text">Logout</span>
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;