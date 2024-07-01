import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography, Button, Grid } from '@mui/material';

function DetailsPanel({ selectedDetails, type, onClose }) {
    return (
        <Paper elevation={3} className="details-panel">
            <Typography variant="h6" gutterBottom>
                {type === 'agent' ? 'Customer Details' : 'Agent Details'}
            </Typography>
            <Grid container spacing={2}>
                {Object.keys(selectedDetails).map(key => (
                    <Grid item xs={12} key={key}>
                        <Typography variant="body1">
                            <strong>{key}:</strong> {selectedDetails[key]}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
            <Button
                onClick={onClose}
                variant="contained"
                color="primary"
                className="close-button"
            >
                Close
            </Button>
        </Paper>
    );
}

DetailsPanel.propTypes = {
    selectedDetails: PropTypes.object.isRequired,
    type: PropTypes.oneOf(['agent', 'customer', 'dirigent']).isRequired,
    onClose: PropTypes.func.isRequired,
};

export default DetailsPanel;
