import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox,
  FormControlLabel,
  Button,
  Menu,
  MenuItem,
  FormGroup,
} from '@mui/material';
import useAnchorEl from '../../../hooks/useAnchorEl';
import useFilteredColumns from '../../../hooks/useFilteredColumns';

const FilterCheckboxes = ({
  columnDefinitions,
  visibleColumns,
  handleColumnVisibilityChange,
  type,
}) => {
  const { anchorEl, handleClick, handleClose } = useAnchorEl();
  const filteredColumns = useFilteredColumns(columnDefinitions, type);
  const firstMenuItemRef = useRef(null);
  const lastMenuItemRef = useRef(null);

  useEffect(() => {
    if (anchorEl && firstMenuItemRef.current) {
      firstMenuItemRef.current.focus();
    }
  }, [anchorEl]);

  return (
    <div className="filter-checkboxes">
      <Button
        aria-controls="Selezione colonne"
        aria-haspopup="true"
        onClick={handleClick}
        variant="contained"
        tabIndex={0}
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
            if (event.key === 'Tab') {
              const focusableElements =
                event.currentTarget.querySelectorAll('[tabindex="0"]');
              const index = Array.prototype.indexOf.call(
                focusableElements,
                document.activeElement
              );
              if (event.shiftKey) {
                if (index === 0) {
                  focusableElements[focusableElements.length - 1].focus();
                  event.preventDefault();
                }
              } else {
                if (index === focusableElements.length - 1) {
                  focusableElements[0].focus();
                  event.preventDefault();
                }
              }
            }
          },
        }}
      >
        <FormGroup>
          {filteredColumns.map((column, index) => (
            <MenuItem
              key={column}
              tabIndex={0}
              ref={
                index === 0
                  ? firstMenuItemRef
                  : index === filteredColumns.length - 1
                    ? lastMenuItemRef
                    : null
              }
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  handleColumnVisibilityChange(column);
                  event.preventDefault();
                }
              }}
            >
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
          ))}
        </FormGroup>
      </Menu>
    </div>
  );
};

FilterCheckboxes.propTypes = {
  columnDefinitions: PropTypes.object.isRequired,
  visibleColumns: PropTypes.object.isRequired,
  handleColumnVisibilityChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['agent', 'customer', 'dirigent']).isRequired,
};

export default React.memo(FilterCheckboxes);
