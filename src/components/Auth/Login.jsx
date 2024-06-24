import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Global.css';
import { getSalt, login } from '../Services/AuthService';
import BackgroundCanvas from "../Common/BackgroundCanvas";

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

        //TODO: backdoor root
        if (username === 'root' && password === 'root') {
            localStorage.setItem('token', 'root');
            navigate('/dashboard');
            return;
        }

        try {
            const salt = await getSalt(username);
            const data = await login(username, password, salt);

            localStorage.setItem('token', data.token);
            navigate('/dashboard');
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage(error.message);
            localStorage.removeItem('token');
        }
    };

    return (
        <div className="container">
            <BackgroundCanvas />
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
                    <div className="btn" onClick={() => navigate('/register')}>
                        Register
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;