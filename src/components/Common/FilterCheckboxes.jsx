import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel, Button, Menu, MenuItem, FormGroup } from '@mui/material';

function FilterCheckboxes({ columnDefinitions, visibleColumns, handleColumnVisibilityChange, type }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="filter-checkboxes">
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} variant="contained">
                Select Columns
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <FormGroup>
                    {Object.keys(columnDefinitions).map(column => (
                        ((column !== 'cust_name' || (type === 'agent' || type === 'dirigent')) &&
                            (column !== 'agent_name' && column !== 'commission' || type === 'customer' || type ==='dirigent')) && (
                            <MenuItem key={column}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={visibleColumns[column]}
                                            onChange={() => handleColumnVisibilityChange(column)}
                                            color="primary"
                                        />
                                    }
                                    label={columnDefinitions[column].displayName}
                                />
                            </MenuItem>
                        )
                    ))}
                </FormGroup>
            </Menu>
        </div>
    );
}

FilterCheckboxes.propTypes = {
    columnDefinitions: PropTypes.object.isRequired,
    visibleColumns: PropTypes.object.isRequired,
    handleColumnVisibilityChange: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['agent', 'customer', 'dirigent']).isRequired,
};

export default FilterCheckboxes;
