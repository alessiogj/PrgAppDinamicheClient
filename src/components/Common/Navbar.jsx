import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Navbar.css';

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        navigate('/login');
    };

    return (
        <nav id="navbar">
            <button className="logout-button" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i>
                <span className="link-text">Logout</span>
            </button>
        </nav>
    );
}

export default Navbar;
