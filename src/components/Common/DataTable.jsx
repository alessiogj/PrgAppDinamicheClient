import React from 'react';
import PropTypes from 'prop-types';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
} from '@mui/material';

function DataTable({ filteredData, visibleColumns, columnDefinitions, handleSort, handleRowClick, handleEdit, type }) {
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
                    {filteredData.map((item, index) => (
                        <TableRow key={index}>
                            {Object.keys(visibleColumns).filter(key => visibleColumns[key]).map(column => (
                                <TableCell
                                    key={column}
                                    onClick={() =>
                                        (column === 'cust_name' && (type === 'agent' || type === 'dirigent')) ||
                                        (column === 'agent_name' && (type === 'customer' || type === 'dirigent'))
                                            ? handleRowClick(item, column)
                                            : null
                                    }
                                >
                                    {(column === 'cust_name' && (type === 'agent' || type === 'dirigent')) ||
                                    (column === 'agent_name' && (type === 'customer' || type === 'dirigent')) ? (
                                        <a href="#!" style={{ color: 'blue' }}>
                                            {item[column]}
                                        </a>
                                    ) : (
                                        item[column]
                                    )}
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

export default DataTable;
