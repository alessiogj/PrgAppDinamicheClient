import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Login attempt with:", username, password);

        // TODO: logica provvisoria di autenticazione
        if (username === "root" && password === "root") {
            localStorage.setItem('token', 'your_auth_token_here'); // TODO: Imposta un token fittizio
            navigate('/dashboard');
        } else {
            setErrorMessage('Invalid username or password.'); // Mostra un messaggio di errore
            // Pulisce il token se presente
            localStorage.removeItem('token');
        }
    };

    const switchToRegisterPage = () => {
        navigate('/register');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <button type="submit">Login</button>
                <button type="button" onClick={switchToRegisterPage}>Switch to Register</button>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default Login;
