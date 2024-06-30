import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../utils/formatDate';
import { getAvailableCustomers } from "../Services/OrderService";

function AddOrderPanel({ addElement, displayNames, handleInputChange, handleConfirmAdd, onCancel, token }) {
    const [customerCodes, setCustomerCodes] = useState([]);

    useEffect(() => {
        const fetchCustomerCodes = async () => {
            try {
                console.log('Fetching customer codes'); // Debug log
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
        const parsedValue = parseInt(value, 10);
        if (!isNaN(parsedValue)) {
            handleInputChange(key, parsedValue);
        } else {
            handleInputChange(key, '');
        }
    };

    return (
        <div className="info-details">
            <h3>Add New Order</h3>
            {Object.keys(addElement).map(key => {
                if (key === 'order_date') {
                    return (
                        <p key={key}>
                            <strong>{displayNames[key]}:</strong>
                            <input
                                type="date"
                                value={formatDate(addElement[key])}
                                onChange={e => handleInputChange(key, e.target.value)}
                            />
                        </p>
                    );
                }

                if (key === 'ord_num') {
                    return (
                        <p key={key}>
                            <strong>{displayNames[key]}:</strong>
                            <input
                                type="number"
                                value={addElement[key]}
                                onChange={e => handleIntegerInputChange(key, e.target.value)}
                            />
                        </p>
                    );
                }

                if (key === 'ord_amount' || key === 'advance_amount') {
                    return (
                        <p key={key}>
                            <strong>{displayNames[key]}:</strong>
                            <input
                                type="number"
                                step="0.01"
                                value={addElement[key]}
                                onChange={e => handleNumberInputChange(key, e.target.value)}
                            />
                        </p>
                    );
                }

                if (key === 'cust_code') {
                    return (
                        <p key={key}>
                            <strong>{displayNames[key]}:</strong>
                            <select
                                value={addElement[key]}
                                onChange={e => handleInputChange(key, e.target.value)}
                            >
                                <option value="">Select Customer Code</option>
                                {customerCodes.map(code => (
                                    <option key={code} value={code}>{code}</option>
                                ))}
                            </select>
                        </p>
                    );
                }

                if (key === 'ord_description') {
                    return (
                        <p key={key}>
                            <strong>{displayNames[key]}:</strong>
                            <input
                                type="text"
                                value={addElement[key]}
                                onChange={e => handleInputChange(key, e.target.value)}
                            />
                        </p>
                    );
                }

                return null;
            })}
            <button onClick={handleConfirmAdd} className="button">Add Order</button>
            <button onClick={onCancel} className="button">Cancel</button>
        </div>
    );
}

AddOrderPanel.propTypes = {
    addElement: PropTypes.object.isRequired,
    displayNames: PropTypes.object.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleConfirmAdd: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired
};

export default AddOrderPanel;
