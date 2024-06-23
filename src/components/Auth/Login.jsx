// src/components/Auth/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Global.css';

const endpoint = 'http://localhost:5000/TODO';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Login attempt with:", username, password);

        if (!username || !password) {
            setErrorMessage('Please fill all fields.');
            return;
        }

        // TODO: Backdoor for root user (remove this in production)
        if (username === 'root' && password === 'root') {
            localStorage.setItem('token', 'root');
            navigate('/dashboard');
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password })
        };

        try {
            const response = await fetch(endpoint, requestOptions);
            const data = await response.json();

            if (response.status === 200) {
                // Save the token in local storage
                localStorage.setItem('token', data.token);
                navigate('/dashboard');
            } else {
                throw new Error(data.message || "Invalid username or password.");
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage(error.message);
            // Remove the token from local storage
            localStorage.removeItem('token');
        }
    };

    const switchToRegisterPage = () => {
        navigate('/register');
    };

    return (
        <div className="wrapper">
            <div className="title">
                Login
            </div>

            <form className="form" onSubmit={handleSubmit}>
                <div className="input_field">
                    <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="input"/>
                    <i className="fas fa-user"></i>
                </div>
                <div className="input_field">
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="input"/>
                    <i className="fas fa-lock"></i>
                </div>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <div className="btn" onClick={handleSubmit}>
                    Submit
                </div>
                <div className="btn" onClick={switchToRegisterPage}>
                    Register
                </div>
            </form>
        </div>
    );
};

export default Login;
