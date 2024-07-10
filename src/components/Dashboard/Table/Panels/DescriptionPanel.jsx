import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography, Grid, TextField, Container, Button } from '@mui/material';

const DescriptionPanel = ({ ord_num, element, onClose }) => {
    return (
        <Container component={Paper} elevation={3} sx={{ p: 2, mt: 4 }}>
            <Typography variant="h5" gutterBottom tabIndex={0}>Descrizione Ordine {ord_num}</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Descrizione Ordine"
                        value={element}
                        multiline
                        rows={3}
                        InputProps={{
                            readOnly: true,
                            style: { color: 'gray' },
                        }}
                        variant="outlined"
                        size="big"
                    />
                </Grid>
            </Grid>
            <Grid container spacing={1} justifyContent="flex-end" sx={{ mt: 2 }}>
                <Grid item>
                    <Button onClick={onClose} variant="contained" color="tertiary" size="small">Chiudi</Button>
                </Grid>
            </Grid>
        </Container>
    );
};

DescriptionPanel.propTypes = {
    ord_num: PropTypes.string.isRequired,
    element: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default DescriptionPanel;
