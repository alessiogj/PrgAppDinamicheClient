import React from 'react';
import '../../styles/Navbar.css';

function Navbar() {
    return (
        <nav id="navbar">
            <ul className="navbar-items flexbox-col">
                <li className="navbar-item flexbox-left">
                    <a className="navbar-item-inner flexbox-left">
                        <div className="navbar-item-inner-icon-wrapper flexbox">
                            <ion-icon name="search-outline"></ion-icon>
                        </div>
                        <span className="link-text">Search</span>
                    </a>
                </li>
                <li className="navbar-item flexbox-left">
                    <a className="navbar-item-inner flexbox-left">
                        <div className="navbar-item-inner-icon-wrapper flexbox">
                            <ion-icon name="home-outline"></ion-icon>
                        </div>
                        <span className="link-text">Home</span>
                    </a>
                </li>
                <li className="navbar-item flexbox-left">
                    <a className="navbar-item-inner flexbox-left">
                        <div className="navbar-item-inner-icon-wrapper flexbox">
                            <ion-icon name="folder-open-outline"></ion-icon>
                        </div>
                        <span className="link-text">Projects</span>
                    </a>
                </li>
                <li className="navbar-item flexbox-left">
                    <a className="navbar-item-inner flexbox-left">
                        <div className="navbar-item-inner-icon-wrapper flexbox">
                            <ion-icon name="pie-chart-outline"></ion-icon>
                        </div>
                        <span className="link-text">Dashboard</span>
                    </a>
                </li>
                <li className="navbar-item flexbox-left">
                    <a className="navbar-item-inner flexbox-left">
                        <div className="navbar-item-inner-icon-wrapper flexbox">
                            <ion-icon name="people-outline"></ion-icon>
                        </div>
                        <span className="link-text">Team</span>
                    </a>
                </li>
                <li className="navbar-item flexbox-left">
                    <a className="navbar-item-inner flexbox-left">
                        <div className="navbar-item-inner-icon-wrapper flexbox">
                            <ion-icon name="chatbubbles-outline"></ion-icon>
                        </div>
                        <span className="link-text">Support</span>
                    </a>
                </li>
                <li className="navbar-item flexbox-left">
                    <a className="navbar-item-inner flexbox-left">
                        <div className="navbar-item-inner-icon-wrapper flexbox">
                            <ion-icon name="settings-outline"></ion-icon>
                        </div>
                        <span className="link-text">Settings</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
