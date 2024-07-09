import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel, Button, Menu, MenuItem, FormGroup } from '@mui/material';
import useAnchorEl from '../../../hooks/useAnchorEl';
import useFilteredColumns from '../../../hooks/useFilteredColumns';

function FilterCheckboxes({ columnDefinitions, visibleColumns, handleColumnVisibilityChange, type }) {
    const { anchorEl, handleClick, handleClose } = useAnchorEl();
    const filteredColumns = useFilteredColumns(columnDefinitions, type);

    const handleKeyDown = (event, column) => {
        if (event.key === 'Enter' || event.key === ' ') {
            handleColumnVisibilityChange(column);
            event.preventDefault(); // Prevents the default action to avoid potential side effects
        }
    };

    return (
        <div className="filter-checkboxes">
            <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                variant="contained"
                tabIndex={0} // Make the button focusable
                onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        handleClick(event);
                    }
                }}
            >
                Selezione colonne
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                    onKeyDown: (event) => {
                        if (event.key === 'Tab' && !event.shiftKey) {
                            event.preventDefault(); // Prevent tabbing out
                            const nextFocusable = document.activeElement.nextElementSibling;
                            if (nextFocusable && nextFocusable.tagName === 'INPUT') {
                                nextFocusable.focus();
                            }
                        }
                    }
                }}
            >
                <FormGroup>
                    {filteredColumns.map(column => (
                        <MenuItem key={column} tabIndex={0} onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                                handleColumnVisibilityChange(column);
                                event.preventDefault();
                            }
                        }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={visibleColumns[column]}
                                        onChange={() => handleColumnVisibilityChange(column)}
                                        color="primary"
                                        tabIndex={-1} // Do not make the checkbox focusable directly
                                    />
                                }
                                label={columnDefinitions[column].displayName}
                                tabIndex={-1} // Do not make the label focusable directly
                            />
                        </MenuItem>
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

export default React.memo(FilterCheckboxes);
