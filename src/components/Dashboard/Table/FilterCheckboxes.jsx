import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel, Button, Menu, MenuItem, FormGroup } from '@mui/material';

/**
 * FilterCheckboxes permette agli utenti di selezionare quali colonne visualizzare in una tabella.
 * Le opzioni disponibili possono variare in base al tipo di utente.
 *
 * @param {Object} columnDefinitions - Definizioni delle colonne con i nomi visualizzati.
 * @param {Object} visibleColumns - Stato che traccia quali colonne sono attualmente visibili.
 * @param {Function} handleColumnVisibilityChange - Funzione per aggiornare la visibilità di una colonna.
 * @param {String} type - Tipo di utente, che può limitare le colonne disponibili.
 */
const FilterCheckboxes = React.memo(({ columnDefinitions, visibleColumns, handleColumnVisibilityChange, type }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    /**
     * Gestisce il click sul pulsante che apre il menu.
     *
     * @param {Object} event - L'evento di click.
     */
    const handleClick = useCallback((event) => {
        setAnchorEl(event.currentTarget);
    }, []);

    /**
     * Chiude il menu di selezione delle colonne.
     */
    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    /**
     * Filtra le colonne disponibili per la selezione basandosi sul tipo di utente e le regole specifiche.
     *
     * @returns {Array} - Un array di nomi di colonne filtrate.
     */
    const filteredColumns = useMemo(() => {
        return Object.keys(columnDefinitions).filter(column => {
            if ((column === 'cust_name' && (type === 'agent' || type === 'dirigent')) ||
                ((column === 'agent_name' || column === 'commission') && (type === 'customer' || type === 'dirigent'))) {
                return true;
            }
            return column !== 'cust_name' && column !== 'agent_name' && column !== 'commission';
        });
    }, [columnDefinitions, type]);

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
                    {filteredColumns.map(column => (
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
                    ))}
                </FormGroup>
            </Menu>
        </div>
    );
});

FilterCheckboxes.propTypes = {
    columnDefinitions: PropTypes.object.isRequired,
    visibleColumns: PropTypes.object.isRequired,
    handleColumnVisibilityChange: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['agent', 'customer', 'dirigent']).isRequired,
};

export default FilterCheckboxes;
