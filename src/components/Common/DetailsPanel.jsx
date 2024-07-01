import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography, Button, Grid, Divider, Box, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '@fontsource/roboto';

// Creazione del tema personalizzato utilizzando Material-UI
const theme = createTheme({
    typography: {
        fontFamily: 'Roboto, sans-serif',
        h6: {
            fontWeight: 'bold',
        },
        body1: {
            lineHeight: 1.5,
        },
    },
    palette: {
        primary: {
            main: '#007bff', // Colore blu principale per elementi UI
        },
    },
});

// Definizione del componente DetailsPanel
function DetailsPanel({ selectedDetails, type, onClose }) {
    const { details, description } = selectedDetails;

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="sm">
                <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        {`${type.charAt(0).toUpperCase() + type.slice(1)} Details`}
                    </Typography>
                    <Divider sx={{ marginY: 2 }} />
                    <Typography variant="body1" paragraph>
                        {description}
                    </Typography>
                    <Divider sx={{ marginY: 2 }} />
                    <Grid container spacing={2}>
                        {Object.keys(details).map((key) => (
                            <Grid item xs={12} key={key}>
                                <Typography variant="body1">
                                    <strong>{key}:</strong> {details[key]}
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>
                    <Box display="flex" justifyContent="flex-end" marginTop={3}>
                        <Button onClick={onClose} variant="contained" color="primary">
                            Close
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </ThemeProvider>
    );
}

// Definizione delle propTypes per validare le props
DetailsPanel.propTypes = {
    selectedDetails: PropTypes.shape({
        details: PropTypes.object.isRequired,
        description: PropTypes.string.isRequired,
    }).isRequired,
    type: PropTypes.oneOf(['agent', 'customer', 'dirigent']).isRequired,
    onClose: PropTypes.func.isRequired,
};

// Esportazione del componente DetailsPanel
export default DetailsPanel;
