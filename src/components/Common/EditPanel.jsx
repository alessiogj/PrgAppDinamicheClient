import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../utils/formatDate';

function EditPanel({ editElement, displayNames, handleInputChange, handleConfirmEdit, handleConfirmDelete, onCancel }) {
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
            <h3>Edit Element</h3>
            {Object.keys(editElement).map(key => {
                if (key === 'order_date') {
                    return (
                        <p key={key}>
                            <strong>{displayNames[key]}:</strong>
                            <input
                                type="date"
                                value={formatDate(editElement[key])}
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
                                value={editElement[key]}
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
                                value={editElement[key]}
                                onChange={e => handleNumberInputChange(key, e.target.value)}
                            />
                        </p>
                    );
                }

                return (
                    ['cust_code', 'ord_description'].includes(key) && (
                        <p key={key}>
                            <strong>{displayNames[key]}:</strong>
                            <input
                                type="text"
                                value={editElement[key]}
                                onChange={e => handleInputChange(key, e.target.value)}
                            />
                        </p>
                    )
                );
            })}
            <button onClick={handleConfirmDelete} className="button">Delete</button>
            <button onClick={handleConfirmEdit} className="button">Confirm</button>
            <button onClick={onCancel} className="button">Cancel</button>
        </div>
    );
}

EditPanel.propTypes = {
    editElement: PropTypes.object.isRequired,
    displayNames: PropTypes.object.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleConfirmEdit: PropTypes.func.isRequired,
    handleConfirmDelete: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default EditPanel;
