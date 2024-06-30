import React from 'react';
import PropTypes from 'prop-types';

function DetailsPanel({ selectedDetails, type, onClose }) {
    return (
        <div className="info-details">
            <h3>{type === 'agent' ? 'Customer Details' : 'Agent Details'}</h3>
            {Object.keys(selectedDetails).map(key => (
                <p key={key}><strong>{key}:</strong> {selectedDetails[key]}</p>
            ))}
            <button onClick={onClose} className="button">Close</button>
        </div>
    );
}

DetailsPanel.propTypes = {
    selectedDetails: PropTypes.object,
    type: PropTypes.oneOf(['agent', 'customer']).isRequired,
    onClose: PropTypes.func.isRequired,
};

export default DetailsPanel;
