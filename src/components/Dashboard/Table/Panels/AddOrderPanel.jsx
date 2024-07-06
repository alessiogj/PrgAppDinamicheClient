import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, Grid, Paper, Typography, Container, MenuItem } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { NumericFormat } from 'react-number-format';
import { formatDate } from "../../../utils/formatDate";
import { useCustomerCodes } from "../../../../hooks/useCustomerCodes";

function AddOrderPanel({ addElement, displayNames, handleInputChange, handleConfirmAdd, onCancel, token }) {
    const customerCodes = useCustomerCodes(token);

    const handleNumberInputChange = (key, value) => {
        const parsedValue = parseFloat(value);
        handleInputChange(key, !isNaN(parsedValue) ? parsedValue.toFixed(2) : '');
    };

    const handleDateChange = (key, date) => {
        handleInputChange(key, date ? formatDate(date) : '');
    };

    const renderTextField = (key) => (
        <Grid item xs={12} sm={6} key={key}>
            <TextField
                fullWidth
                label={displayNames[key]}
                value={addElement[key] || ''}
                InputProps={{
                    readOnly: true,
                    style: { color: 'gray' },
                }}
                variant="outlined"
            />
        </Grid>
    );

    const renderDateField = (key) => (
        <Grid item xs={12} sm={6} key={key}>
            <DatePicker
                selected={addElement[key] ? new Date(addElement[key]) : null}
                onChange={(date) => handleDateChange(key, date)}
                customInput={<TextField fullWidth label={displayNames[key]} variant="outlined" />}
                dateFormat="yyyy-MM-dd"
            />
        </Grid>
    );

    const renderNumberField = (key) => (
        <Grid item xs={12} sm={6} key={key}>
            <NumericFormat
                fullWidth
                label={displayNames[key]}
                value={addElement[key] || ''}
                customInput={TextField}
                thousandSeparator
                decimalScale={2}
                fixedDecimalScale
                prefix={'€'}
                onValueChange={(values) => handleNumberInputChange(key, values.value)}
            />
        </Grid>
    );

    const renderSelectField = (key) => (
        <Grid item xs={12} sm={6} key={key}>
            <TextField
                select
                fullWidth
                label={displayNames[key]}
                value={addElement[key] || ''}
                onChange={e => handleInputChange(key, e.target.value)}
                variant="outlined"
            >
                <MenuItem value="">Select Customer Code</MenuItem>
                {customerCodes.map(code => (
                    <MenuItem key={code} value={code}>{code}</MenuItem>
                ))}
            </TextField>
        </Grid>
    );

    const renderDescriptionField = (key) => (
        <Grid item xs={12} key={key}>
            <TextField
                fullWidth
                label={displayNames[key]}
                value={addElement[key] || ''}
                onChange={e => handleInputChange(key, e.target.value)}
                multiline
                rows={4}
                variant="outlined"
            />
        </Grid>
    );

    return (
        <Container component={Paper} elevation={3} sx={{ p: 4, mt: 4 }}>
            <Typography variant="h4" gutterBottom>Aggiungi Ordine</Typography>
            <Grid container spacing={3}>
                {/* Read-only field for agent_code */}
                {['agent_code'].map(renderTextField)}

                {Object.keys(addElement).map(key => {
                    if (key === 'ord_date') return renderDateField(key);
                    if (key === 'ord_amount' || key === 'advance_amount') return renderNumberField(key);
                    if (key === 'cust_code') return renderSelectField(key);
                    if (key === 'ord_description') return renderDescriptionField(key);
                    return null;
                })}
            </Grid>
            <Grid container spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
                <Grid item>
                    <Button onClick={onCancel} variant="contained" color="secondary">Chiudi</Button>
                </Grid>
                <Grid item>
                    <Button onClick={handleConfirmAdd} variant="contained" color="primary">Conferma</Button>
                </Grid>
            </Grid>
        </Container>
    );
}

AddOrderPanel.propTypes = {
    addElement: PropTypes.object.isRequired,
    displayNames: PropTypes.object.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleConfirmAdd: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
};

export default AddOrderPanel;
