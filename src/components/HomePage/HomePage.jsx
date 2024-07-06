import React, { useState, useEffect, useCallback } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useSnackbar } from 'notistack';
import { login } from '../../Services/AuthService';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import '../../styles/HomePage.css';

/**
 * Componente HomePage che funge da pagina principale per il login dell'utente.
 */
const HomePage = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [isFlipped, setIsFlipped] = useState(false);
    const [hasFlipped, setHasFlipped] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    /**
     * Aggiunge e rimuove una classe CSS al body e gestisce il keydown per il ribaltamento della card.
     */
    useEffect(() => {
        document.body.classList.add('home-body');

        const handleKeyDown = (event) => {
            if (event.key === 'Enter' && !hasFlipped) {
                if (!isFlipped) {
                    setIsFlipped(true);
                    setUsername('');
                    setPassword('');
                } else {
                    handleSubmit(event);
                }
                setHasFlipped(true);
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.classList.remove('home-body');
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isFlipped, hasFlipped]);

    /**
     * Gestisce il ribaltamento della card quando viene cliccato l'elemento giusto.
     */
    const handleFlip = useCallback((event) => {
        if (
            event.type === 'click' &&
            event.target.closest('.flip-card') &&
            !event.target.closest('input, button') &&
            !hasFlipped
        ) {
            setIsFlipped((prev) => !prev);
            setUsername('');
            setPassword('');
            setUsernameError(false);
            setPasswordError(false);
            setHasFlipped(true);
        }
    }, [hasFlipped]);

    /**
     * Gestisce la sottomissione del form di login.
     *
     * @param {Event} event - L'evento del submit del form.
     */
    const handleSubmit = async (event) => {
        event.preventDefault();

        setUsernameError(!username);
        setPasswordError(!password);

        if (!username || !password) {
            enqueueSnackbar('Compila tutti i campi', { variant: 'warning' });
            return;
        }

        try {
            localStorage.removeItem('jwtToken');
            const { token } = await login(username, password);
            localStorage.setItem('jwtToken', token);
            setIsFlipped(false);
            navigate('/dashboard');
        } catch (error) {
            enqueueSnackbar('Errore durante il login', { variant: 'error' });
            localStorage.removeItem('jwtToken');
        }
    };

    return (
        <Container maxWidth="sm" className="home-container" onClick={handleFlip}>
            <Box className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
                <Box className="flip-card-inner">
                    <Box className="flip-card-front">
                        <Typography variant="h3" component="h1" gutterBottom>
                            Benvenuto!
                        </Typography>
                        <Typography variant="body1" className="home-text" onClick={() => setIsFlipped(true)}>
                            Clicca qui per accedere
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
                            usernameError={usernameError}
                            passwordError={passwordError}
                        />
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default HomePage;
