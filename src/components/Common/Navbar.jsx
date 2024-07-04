import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import '../../styles/Navbar.css';
import PropTypes from "prop-types";

function Navbar({user, onLogout}) {

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {user}
                </Typography>
                <Button color="inherit" onClick={onLogout} startIcon={<LogoutIcon />}>
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
}

Navbar.propTypes = {
    user: PropTypes.string.isRequired,
    onLogout: PropTypes.func.isRequired,
};

export default Navbar;
