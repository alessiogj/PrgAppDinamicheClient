import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

/**
 * DataTable è un componente che visualizza i dati in formato tabellare con funzionalità interattive.
 * Permette agli utenti di ordinare le colonne, modificare record e visualizzare dettagli specifici per il tipo di utente.
 *
 * @param {Array} filteredData - I dati filtrati da visualizzare nella tabella.
 * @param {Object} visibleColumns - Un oggetto che specifica quali colonne devono essere visualizzate.
 * @param {Object} columnDefinitions - Definizioni delle colonne che includono il nome visualizzato.
 * @param {Function} handleSort - Funzione per gestire l'ordinamento delle colonne.
 * @param {Function} handleRowClick - Funzione per gestire il clic su una riga (per visualizzare dettagli o altre azioni).
 * @param {Function} handleEdit - Funzione per attivare la modalità di modifica di un record.
 * @param {String} type - Tipo di utente, che influisce su alcune delle funzioni e visualizzazioni disponibili.
 */
function DataTable({ filteredData, visibleColumns, columnDefinitions, handleSort, handleRowClick, handleEdit, type }) {
    /**
     * Renderizza il contenuto di ogni cella della tabella. Se la cella è cliccabile, basandosi sul tipo di utente e
     * sulla colonna, viene restituito un componente Button, altrimenti mostra solo il testo.
     *
     * @param {Object} item - Oggetto dati della riga corrente.
     * @param {String} column - Chiave della colonna corrente.
     * @returns {React.Node} - Nodo React che può essere un Button o un elemento di testo semplice.
     */
    const renderCellContent = (item, column) => {
        const isClickable = (column === 'cust_name' && (type === 'agent' || type === 'dirigent')) ||
            (column === 'agent_name' && (type === 'customer' || type === 'dirigent'));

        if (isClickable) {
            return <Button color="primary" onClick={() => handleRowClick(item, column)}>{item[column]}</Button>;
        }
        return item[column];
    };

    return (
        <TableContainer component={Paper}>
            <Table className="data-table">
                <TableHead>
                    <TableRow>
                        {Object.keys(visibleColumns).filter(key => visibleColumns[key]).map(column => (
                            <TableCell key={column} onClick={() => handleSort(column)}>
                                {columnDefinitions[column].displayName}
                            </TableCell>
                        ))}
                        {(type === 'agent' || type === 'dirigent') && <TableCell>Actions</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredData.map((item) => (
                        <TableRow key={item.id || item.ord_num}>
                            {Object.keys(visibleColumns).filter(key => visibleColumns[key]).map(column => (
                                <TableCell key={column}>
                                    {renderCellContent(item, column)}
                                </TableCell>
                            ))}
                            {(type === 'agent' || type === 'dirigent') && (
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={(e) => { e.stopPropagation(); handleEdit(item); }}>
                                        Edit
                                    </Button>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

DataTable.propTypes = {
    filteredData: PropTypes.array.isRequired,
    visibleColumns: PropTypes.object.isRequired,
    columnDefinitions: PropTypes.object.isRequired,
    handleSort: PropTypes.func.isRequired,
    handleRowClick: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['agent', 'customer', 'dirigent']).isRequired,
};

export default React.memo(DataTable);
