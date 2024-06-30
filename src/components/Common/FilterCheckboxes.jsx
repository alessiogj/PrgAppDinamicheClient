import React from 'react';
import PropTypes from 'prop-types';

function FilterCheckboxes({ columnDefinitions, visibleColumns, handleColumnVisibilityChange, type }) {
    return (
        <div className="filter-checkboxes">
            {Object.keys(columnDefinitions).map(column => (
                ((column !== 'cust_name' || type === 'agent') &&
                    (column !== 'agent_name' && column !== 'commission' || type === 'customer')) && (
                    <label key={column}>
                        <input
                            type="checkbox"
                            checked={visibleColumns[column]}
                            onChange={() => handleColumnVisibilityChange(column)}
                        />
                        {columnDefinitions[column].displayName}
                    </label>
                )
            ))}
        </div>
    );
}

FilterCheckboxes.propTypes = {
    columnDefinitions: PropTypes.object.isRequired,
    visibleColumns: PropTypes.object.isRequired,
    handleColumnVisibilityChange: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['agent', 'customer']).isRequired,
};

export default FilterCheckboxes;
