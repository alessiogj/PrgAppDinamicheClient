import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getAvailableCustomers } from "../Services/OrderService";
import { TextField, Button, Grid, Paper, Typography, Container, MenuItem } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { NumericFormat } from 'react-number-format';
import { formatDate } from "../utils/formatDate";

function AddOrderPanel({ addElement, displayNames, handleInputChange, handleConfirmAdd, onCancel, token }) {
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

    const handleDateChange = (key, date) => {
        if (date) {
            handleInputChange(key, formatDate(date));
        } else {
            handleInputChange(key, '');
        }
    };

    return (
        <Container component={Paper} elevation={3} sx={{ p: 4, mt: 4 }}>
            <Typography variant="h4" gutterBottom>Add New Order</Typography>
            <Grid container spacing={3}>
                {/* Read-only field for agent_code */}
                {['agent_code'].map(key => (
                    <Grid item xs={12} sm={6} key={key}>
                        <TextField
                            fullWidth
                            label={displayNames[key]}
                            value={addElement[key] || 'N/A'}
                            InputProps={{
                                readOnly: true,
                                style: { color: 'gray' },
                            }}
                            variant="outlined"
                        />
                    </Grid>
                ))}

                {Object.keys(addElement).map(key => {
                    if (key === 'order_date') {
                        return (
                            <Grid item xs={12} sm={6} key={key}>
                                <DatePicker
                                    fullWidth
                                    selected={addElement[key] ? new Date(addElement[key]) : null}
                                    onChange={(date) => handleDateChange(key, date)}
                                    label={displayNames[key]}
                                    customInput={<TextField fullWidth label={displayNames[key]} />}
                                    dateFormat="yyyy-MM-dd"
                                    variant="outlined"
                                    thousandSeparator={true}
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
                                    value={addElement[key]}
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
                                    value={addElement[key]}
                                    onChange={e => handleInputChange(key, e.target.value)}
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
                                    value={addElement[key]}
                                    onChange={e => handleInputChange(key, e.target.value)}
                                    multiline
                                    rows={4}
                                />
                            </Grid>
                        );
                    }

                    return null;
                })}
            </Grid>
            <Grid container spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
                <Grid item>
                    <Button onClick={onCancel} variant="contained" color="secondary">Cancel</Button>
                </Grid>
                <Grid item>
                    <Button onClick={handleConfirmAdd} variant="contained" color="primary">Add Order</Button>
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
