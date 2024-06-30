import React from 'react';
import PropTypes from 'prop-types';

function PopupMessage({ message, onClose }) {
    return (
        <div className={`popup-message ${message.type}`}>
            <p>{message.text}</p>
            <button onClick={onClose} className="button">Close</button>
        </div>
    );
}

PopupMessage.propTypes = {
    message: PropTypes.shape({
        type: PropTypes.oneOf(['success', 'error']).isRequired,
        text: PropTypes.string.isRequired
    }).isRequired,
    onClose: PropTypes.func.isRequired
};

export default PopupMessage;
