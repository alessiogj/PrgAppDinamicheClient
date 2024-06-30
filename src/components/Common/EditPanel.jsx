import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../utils/formatDate';
import { getAvailableCustomers } from "../Services/OrderService";
import { TextField, Button, MenuItem, Grid, Paper, Typography, Container } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { NumericFormat } from 'react-number-format';

function EditPanel({ editElement, displayNames, handleInputChange, handleConfirmEdit, handleConfirmDelete, onCancel, token }) {
    const [customerCodes, setCustomerCodes] = useState([]);

    useEffect(() => {
        const fetchCustomerCodes = async () => {
            try {
                const result = await getAvailableCustomers(token);
                if (result && result.customers) {
                    setCustomerCodes(result.customers.map(customer => customer.cust_code));
                } else {
                    console.error('Invalid response format:', result);
                }
            } catch (error) {
                console.error('Error fetching customer codes:', error);
            }
        };

        fetchCustomerCodes();
    }, [token]);

    const handleNumberInputChange = (key, value) => {
        const parsedValue = parseFloat(value);
        if (!isNaN(parsedValue)) {
            handleInputChange(key, parsedValue.toFixed(2));
        } else {
            handleInputChange(key, '');
        }
    };

    const handleIntegerInputChange = (key, value) => {
        if (/^\d*$/.test(value)) {
            handleInputChange(key, value);
        }
    };

    const handleDateChange = (key, date) => {
        if (date) {
            handleInputChange(key, formatDate(date));
        } else {
            handleInputChange(key, '');
        }
    };

    return (
        <Container component={Paper} elevation={3} sx={{ p: 4, mt: 4 }}>
            <Typography variant="h4" gutterBottom>Edit Element</Typography>
            <Grid container spacing={3}>
                {Object.keys(editElement).map(key => {
                    if (key === 'order_date') {
                        return (
                            <Grid item xs={12} sm={6} key={key}>
                                <DatePicker
                                    selected={editElement[key] ? new Date(editElement[key]) : null}
                                    onChange={(date) => handleDateChange(key, date)}
                                    customInput={<TextField fullWidth label={displayNames[key]} />}
                                    dateFormat="yyyy-MM-dd"
                                />
                            </Grid>
                        );
                    }

                    if (key === 'ord_amount' || key === 'advance_amount') {
                        return (
                            <Grid item xs={12} sm={6} key={key}>
                                <NumericFormat
                                    fullWidth
                                    label={displayNames[key]}
                                    value={editElement[key]}
                                    customInput={TextField}
                                    thousandSeparator={true}
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                    prefix={'€'}
                                    onValueChange={(values) => handleNumberInputChange(key, values.value)}
                                />
                            </Grid>
                        );
                    }

                    if (key === 'cust_code') {
                        return (
                            <Grid item xs={12} sm={6} key={key}>
                                <TextField
                                    select
                                    fullWidth
                                    label={displayNames[key]}
                                    value={editElement[key]}
                                    onChange={e => handleInputChange(key, e.target.value)}
                                    error={!customerCodes.includes(editElement[key])}
                                    helperText={!customerCodes.includes(editElement[key]) ? 'Invalid customer code' : ''}
                                >
                                    <MenuItem value="">Select Customer Code</MenuItem>
                                    {customerCodes.map(code => (
                                        <MenuItem key={code} value={code}>{code}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        );
                    }

                    if (key === 'ord_description') {
                        return (
                            <Grid item xs={12} key={key}>
                                <TextField
                                    fullWidth
                                    label={displayNames[key]}
                                    value={editElement[key]}
                                    onChange={e => handleInputChange(key, e.target.value)}
                                    multiline
                                    rows={4}
                                />
                            </Grid>
                        );
                    }

                    if (key === 'ord_num') {
                        return (
                            <Grid item xs={12} sm={6} key={key}>
                                <TextField
                                    fullWidth
                                    label={displayNames[key]}
                                    value={editElement[key]}
                                    onChange={e => handleIntegerInputChange(key, e.target.value)}
                                />
                            </Grid>
                        );
                    }

                    return null;
                })}
            </Grid>
            <Grid container spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
                <Grid item>
                    <Button onClick={handleConfirmDelete} variant="contained" color="secondary">Delete</Button>
                </Grid>
                <Grid item>
                    <Button onClick={handleConfirmEdit} variant="contained" color="primary">Confirm</Button>
                </Grid>
                <Grid item>
                    <Button onClick={onCancel} variant="contained">Cancel</Button>
                </Grid>
            </Grid>
        </Container>
    );
}

EditPanel.propTypes = {
    editElement: PropTypes.object.isRequired,
    displayNames: PropTypes.object.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleConfirmEdit: PropTypes.func.isRequired,
    handleConfirmDelete: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
};

export default EditPanel;
