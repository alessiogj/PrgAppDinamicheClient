import React, { useRef, useEffect } from 'react';
import { Box, TextField, Button, InputAdornment } from '@mui/material';
import { Person as PersonIcon, Lock as LockIcon } from '@mui/icons-material';

/**
 * Form di login per inserire username e password.
 *
 * @param {string} username - Username dell'utente.
 * @param {Function} setUsername - Funzione per aggiornare lo stato dell'username.
 * @param {string} password - Password dell'utente.
 * @param {Function} setPassword - Funzione per aggiornare lo stato della password.
 * @param {Function} handleSubmit - Funzione chiamata al submit del form.
 * @param {boolean} isFlipped - Stato che indica se il form di login è visibile.
 */
const LoginForm = ({ username, setUsername, password, setPassword, handleSubmit, isFlipped }) => {
    const usernameRef = useRef(); // Ref per l'input dell'username.
    const passwordRef = useRef(); // Ref per l'input della password.

    /**
     * Effetto che mette il focus sull'input dell'username quando il form diventa visibile.
     */
    useEffect(() => {
        if (isFlipped) {
            usernameRef.current.focus();
        }
    }, [isFlipped]);

    return (
        <form className="form" onSubmit={handleSubmit}>
            {isFlipped && (
                <>
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
                                inputRef: usernameRef, // Collegamento del ref all'input.
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
                                inputRef: passwordRef, // Collegamento del ref all'input.
                            }}
                        />
                    </Box>
                    <Box className="button-container">
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Submit
                        </Button>
                    </Box>
                </>
            )}
        </form>
    );
};

export default LoginForm;
