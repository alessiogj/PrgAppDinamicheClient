import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import '../../styles/Navbar.css';
import PropTypes from 'prop-types';

const Navbar = ({ user, onLogout }) => {
  return (
    <AppBar position="static" aria-label="Barra di navigazione">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          tabIndex={0}
          aria-label={`Utente: ${user}`}
        >
          {user}
        </Typography>
        <Button
          color="inherit"
          onClick={onLogout}
          startIcon={<LogoutIcon />}
          aria-label="Pulsante di logout"
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  user: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Navbar;
