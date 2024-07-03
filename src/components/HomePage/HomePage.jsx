import React, { useState, useEffect, useCallback } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useSnackbar } from 'notistack';
import { login } from '../../Services/AuthService';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import '../../styles/HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [isFlipped, setIsFlipped] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        document.body.classList.add('home-body');
        return () => {
            document.body.classList.remove('home-body');
        };
    }, []);

    const handleFlip = useCallback((event) => {
        if (event.type === 'click' && event.target.closest('.flip-card') && !event.target.closest('input, button')){
            setIsFlipped((prev) => !prev);
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!username || !password) {
            enqueueSnackbar('Please fill all fields.', { variant: 'error' });
            return;
        }

        try {
            localStorage.removeItem('jwtToken');
            const { token } = await login(username, password);
            localStorage.setItem('jwtToken', token);
            setIsFlipped(false);
            navigate('/dashboard');
        } catch (error) {
            enqueueSnackbar(error.message || 'Failed to fetch', { variant: 'error' });
            localStorage.removeItem('jwtToken');
        }
    };

    return (
        <Container maxWidth="sm" onKeyDown={handleFlip}>
            <Box className={`flip-card ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
                <Box className="flip-card-inner">
                    <Box className="flip-card-front">
                        <Typography variant="h3" component="h1" gutterBottom>
                            Welcome!
                        </Typography>
                        <Typography variant="body1" className="home-text" onClick={() => setIsFlipped(true)}>
                            Click here to login.
                        </Typography>
                    </Box>
                    <Box className="flip-card-back">
                        <Typography variant="h4" component="h1" gutterBottom>
                            Login
                        </Typography>
                        <LoginForm
                            username={username}
                            setUsername={setUsername}
                            password={password}
                            setPassword={setPassword}
                            handleSubmit={handleSubmit}
                            isFlipped={isFlipped}
                        />
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default HomePage;
