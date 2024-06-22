// src/auth/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = ({ switchToLogin }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        // TODO: logica di registrazione
        event.preventDefault();
        console.log("Register attempt with:", username, email, password);
        navigate('/login');
    };

    const switchToLoginPage = () => {
        navigate('/login');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <button type="submit">Register</button>
            </form>
            <button onClick={switchToLoginPage}>Switch to Login</button>
        </div>
    );
};

export default Register;
