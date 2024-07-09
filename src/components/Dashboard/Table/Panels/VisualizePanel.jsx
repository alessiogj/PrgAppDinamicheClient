import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography, Grid, TextField, Container, Button, Box } from '@mui/material';

function VisualizePanel({ element, displayNames, onClose }) {
    return (
        <Container component={Paper} elevation={3} sx={{ p: 2, mt: 4 }}>
            <Typography variant="h5" gutterBottom tabIndex={0}>{element.description}</Typography>
            <Grid container spacing={2}>
                {Object.keys(element.details).map(key => {
                    const label = displayNames[key] || key;
                    const value = element.details[key] || 'N/A';
                    return (
                        <Grid item xs={12} sm={6} key={key}>
                            <Box sx={{ mb: 1 }}>
                                <Typography variant="body2" color="textSecondary">{label}</Typography>
                                <TextField
                                    fullWidth
                                    value={value}
                                    InputProps={{
                                        readOnly: true,
                                        style: { color: 'gray' },
                                    }}
                                    variant="outlined"
                                    size="small"
                                />
                            </Box>
                        </Grid>
                    );
                })}
            </Grid>
            <Grid container spacing={1} justifyContent="flex-end" sx={{ mt: 2 }}>
                <Grid item>
                    <Button onClick={onClose} variant="contained" color="primary" size="small">Chiudi</Button>
                </Grid>
            </Grid>
        </Container>
    );
}

VisualizePanel.propTypes = {
    element: PropTypes.object.isRequired,
    displayNames: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default VisualizePanel;
