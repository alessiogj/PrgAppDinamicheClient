import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, Button, InputAdornment } from '@mui/material';
import { Person as PersonIcon, Lock as LockIcon } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { login } from './Services/AuthService';
import '../styles/HomePage.css';
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();
    const [isFlipped, setIsFlipped] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        document.body.classList.add('home-body');
        return () => {
            document.body.classList.remove('home-body');
        };
    }, []);

    const handleFlip = (event) => {
        if (event.target.closest('.flip-card') && !event.target.closest('input, button')) {
            setIsFlipped(!isFlipped);
        }
    };

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
            navigate('/dashboard');
        } catch (error) {
            enqueueSnackbar(error.message || 'Failed to fetch', { variant: 'error' });
            localStorage.removeItem('jwtToken');
        }
    };

    return (
        <Container maxWidth="sm" className="home-container">
            <Box className={`flip-card ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
                <Box className="flip-card-inner">
                    <Box className="flip-card-front">
                        <Typography variant="h3" component="h1" gutterBottom>
                            Welcome!
                        </Typography>
                        <Typography variant="body1" className="home-text">
                            Click anywhere to login
                        </Typography>
                    </Box>
                    <Box className="flip-card-back">
                        <Typography variant="h4" component="h1" gutterBottom>
                            Login
                        </Typography>
                        <form className="form" onSubmit={handleSubmit}>
                            <Box className="input_field" sx={{ mb: 2 }}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>
                            <Box className="input_field" sx={{ mb: 2 }}>
                                <TextField
                                    fullWidth
                                    type="password"
                                    variant="outlined"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>
                            <Box className="button-container">
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    Submit
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default HomePage;
