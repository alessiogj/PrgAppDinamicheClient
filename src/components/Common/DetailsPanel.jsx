import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography, Button, Grid, Divider } from '@mui/material';

function DetailsPanel({ selectedDetails, type, onClose }) {
    const { details, description } = selectedDetails;

    return (
        <Paper elevation={3} className="details-panel">
            <Typography variant="h6" gutterBottom>
                {description}
            </Typography>
            <Divider />
            <Grid container spacing={2}>
                {Object.keys(details).map(key => (
                    <Grid item xs={12} key={key}>
                        <Typography variant="body1">
                            <strong>{key}:</strong> {details[key]}
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
    selectedDetails: PropTypes.shape({
        details: PropTypes.object.isRequired,
        description: PropTypes.string.isRequired
    }).isRequired,
    type: PropTypes.oneOf(['agent', 'customer', 'dirigent']).isRequired,
    onClose: PropTypes.func.isRequired,
};

export default DetailsPanel;
