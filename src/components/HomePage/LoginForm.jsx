import React, { useRef, useEffect } from 'react';
import { Box, TextField, Button, InputAdornment } from '@mui/material';
import { Person as PersonIcon, Lock as LockIcon } from '@mui/icons-material';

const LoginForm = ({ username, setUsername, password, setPassword, handleSubmit, isFlipped }) => {
    const usernameRef = useRef();
    const passwordRef = useRef();

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
                                inputRef: usernameRef,
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
                                inputRef: passwordRef,
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
