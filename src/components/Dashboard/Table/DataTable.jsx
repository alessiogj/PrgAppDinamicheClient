import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

function DataTable({
                       filteredData,
                       visibleColumns,
                       columnDefinitions,
                       handleSort,
                       type,
                       handleRowClick,
                       handleEdit,
                       handleShowDescription
                   }) {
    /**
     * Renderizza il contenuto di una cella in base al tipo di colonna e alle regole specifiche.
     *
     * @param {Object} item L'oggetto dati della riga corrente.
     * @param {String} column Il nome della colonna da renderizzare.
     * @returns {React.JSX.Element} Il contenuto della cella renderizzato come elemento React.
     */
    const renderCellContent = (item, column) => {
        const isClickable = (column === 'cust_name' && (type === 'agent' || type === 'dirigent')) ||
            (column === 'agent_name' && (type === 'customer' || type === 'dirigent'));

        if (isClickable) {
            return <Button color="primary" onClick={() => handleRowClick(item, column)}>{item[column]}</Button>;
        }

        if (column === 'description') {
            return (
                <Button variant="contained" color="primary" onClick={(e) => {
                    handleShowDescription(item);
                    e.stopPropagation(); // Previene il triggering di eventi del TableRow
                }}>
                    Dettagli
                </Button>
            );
        }

        return item[column];
    };

    /**
     * Memorizza le intestazioni delle colonne per evitare ricalcoli inutili.
     */
    const tableHeaders = useMemo(() => (
        Object.keys(visibleColumns).filter(key => visibleColumns[key]).map(column => (
            <TableCell key={column} onClick={() => handleSort(column)}>
                {columnDefinitions[column].displayName}
            </TableCell>
        ))
    ), [visibleColumns, columnDefinitions, handleSort]);

    /**
     * Renderizza le righe della tabella.
     */
    const renderRows = () => (
        filteredData.map((item) => (
            <TableRow key={item.id || item.ord_num}>
                {Object.keys(visibleColumns).filter(key => visibleColumns[key]).map(column => (
                    <TableCell key={column}>
                        {renderCellContent(item, column)}
                    </TableCell>
                ))}
                {(type === 'agent' || type === 'dirigent') && (
                    <TableCell>
                        <Button variant="contained" color="primary" onClick={(e) => {
                            e.stopPropagation(); // Impedisce il bubbling del click al TableRow
                            handleEdit(item);
                        }}>
                            Modifica
                        </Button>
                    </TableCell>
                )}
            </TableRow>
        ))
    );

    return (
        <TableContainer component={Paper}>
            <Table className="data-table">
                <TableHead>
                    <TableRow>
                        {tableHeaders}
                        {(type === 'agent' || type === 'dirigent') && <TableCell>Azioni</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {renderRows()}
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
    handleShowDescription: PropTypes.func.isRequired,
};

export default React.memo(DataTable);
