import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Global.css';
import { login } from '../Services/AuthService';
import BackgroundCanvas from '../Common/BackgroundCanvas';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!username || !password) {
            setErrorMessage('Please fill all fields.');
            return;
        }

        try {
            const { token } = await login(username, password);
            console.log('Token:', token);
            localStorage.setItem('jwtToken', token);
            setErrorMessage(''); // Clear the error message
            navigate('/dashboard');
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage(error.message || 'Failed to fetch');
            localStorage.removeItem('jwtToken');
        }
    };

    return (
        <div className="container">
            <BackgroundCanvas />
            <div className="wrapper">
                <div className="title">Login</div>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="input_field">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="input"
                        />
                        <i className="fas fa-user"></i>
                    </div>
                    <div className="input_field">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input"
                        />
                        <i className="fas fa-lock"></i>
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className="button-container">
                        <button type="submit" className="btn">
                            Submit
                        </button>
                        <button type="button" className="btn" onClick={() => navigate('/register')}>
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
