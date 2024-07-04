import React from 'react';
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
    const renderCellContent = (item, column) => {
        const isClickable = (column === 'cust_name' && (type === 'agent' || type === 'dirigent')) ||
            (column === 'agent_name' && (type === 'customer' || type === 'dirigent'));

        if (isClickable) {
            return <Button color="primary" onClick={() => handleRowClick(item, column)}>{item[column]}</Button>;
        }

        if (column === 'description') {
            return <Button variant="contained" color="primary" onClick={(e) => {
                handleShowDescription(item);
                e.stopPropagation();
            }}>
                Dettagli
            </Button>;
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
                                    <Button variant="contained" color="primary" onClick={(e) => {
                                        e.stopPropagation();
                                        handleEdit(item);
                                    }}>
                                        Modifica
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
    handleShowDescription: PropTypes.func.isRequired,
};

export default React.memo(DataTable);
