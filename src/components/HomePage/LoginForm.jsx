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
 * @param {boolean} isFlipped - Stato che indica se il form di login è  visibile.
 * @param {boolean} usernameError - Stato che indica se l'username è errato.
 * @param {boolean} passwordError - Stato che indica se la password è errata.
 */
const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  handleSubmit,
  isFlipped,
  usernameError,
  passwordError,
}) => {
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
              error={usernameError}
              helperText={usernameError ? 'Username richiesto' : ''}
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
              error={passwordError}
              helperText={passwordError ? 'Password richiesta' : ''}
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
              Invia
            </Button>
          </Box>
        </>
      )}
    </form>
  );
};

export default LoginForm;
