import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel, Button, Menu, MenuItem, FormGroup } from '@mui/material';
import useAnchorEl from '../../../hooks/useAnchorEl';
import useFilteredColumns from '../../../hooks/useFilteredColumns';

/**
 * Componente React per la selezione di colonne in una tabella.
 * Utilizza un approccio funzionale con hooks per gestire lo stato e le ottimizzazioni.
 *
 * @param {Object} props Proprietà del componente.
 * @param {Object} props.columnDefinitions Definizioni delle colonne con i nomi visualizzati.
 * @param {Object} props.visibleColumns Stato che traccia quali colonne sono attualmente visibili.
 * @param {Function} props.handleColumnVisibilityChange Funzione per aggiornare la visibilità di una colonna.
 * @param {String} props.type Tipo di utente, che può limitare le colonne disponibili.
 */
function FilterCheckboxes({
                              columnDefinitions,
                              visibleColumns,
                              handleColumnVisibilityChange,
                              type
                          }) {
    const { anchorEl, handleClick, handleClose } = useAnchorEl();
    const filteredColumns = useFilteredColumns(columnDefinitions, type);

    return (
        <div className="filter-checkboxes">
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} variant="contained">
                Selezione colonne
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
}

FilterCheckboxes.propTypes = {
    columnDefinitions: PropTypes.object.isRequired,
    visibleColumns: PropTypes.object.isRequired,
    handleColumnVisibilityChange: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['agent', 'customer', 'dirigent']).isRequired,
};

export default React.memo(FilterCheckboxes);
