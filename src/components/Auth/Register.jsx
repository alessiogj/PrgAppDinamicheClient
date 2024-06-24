import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Global.css';
import BackgroundCanvas from "../Common/BackgroundCanvas";

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Register attempt with:", username, email, password);

        if (username && email && password) {
            if (validateEmail(email)) {
                navigate('/login');
            }
            else {
                setErrorMessage('Please insert a valid email address.')
            }
        } else {
            setErrorMessage('Please fill all fields.');
        }
    };

    // Placeholder function for Google registration
    const handleGoogleRegister = () => {
        console.log("Register with Google");
    };

    // Placeholder function for Apple registration
    const handleAppleRegister = () => {
        console.log("Register with Apple");
    };

    return (
        <div className="container">
            <BackgroundCanvas />
            <div className="wrapper">
                <div className="title">
                    Register Here
                </div>
                <div className="social_media">
                    <div className="item" onClick={handleGoogleRegister}>
                        <i className="fab fa-google"></i> {/* Google icon */}
                    </div>
                    <div className="item" onClick={handleAppleRegister}>
                        <i className="fab fa-apple"></i> {/* Apple icon */}
                    </div>
                </div>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="input_field">
                        <input type="text" placeholder="Username" className="input" value={username}
                               onChange={e => setUsername(e.target.value)}/>
                        <i className="fas fa-user"></i>
                    </div>
                    <div className="input_field">
                        <input type="email" placeholder="Email" className="input" value={email}
                               onChange={e => setEmail(e.target.value)}/>
                        <i className="far fa-envelope"></i>
                    </div>
                    <div className="input_field">
                        <input type="password" placeholder="Password" className="input" value={password}
                               onChange={e => setPassword(e.target.value)}/>
                        <i className="fas fa-lock"></i>
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className="btn" onClick={handleSubmit}>
                        Register
                    </div>
                    <div className="btn" onClick={() => navigate('/login')}>
                        Login
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
