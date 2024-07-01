import React from 'react';
import PropTypes from 'prop-types';

function DataTable({ filteredData, visibleColumns, columnDefinitions, handleSort, handleRowClick, handleEdit, type }) {
    return (
        <table className="data-table">
            <thead>
            <tr>
                {Object.keys(visibleColumns).filter(key => visibleColumns[key]).map(column => (
                    <th key={column} onClick={() => handleSort(column)}>
                        {columnDefinitions[column].displayName}
                    </th>
                ))}
                {(type === 'agent' || type === 'dirigent') && <th>Actions</th>}
            </tr>
            </thead>
            <tbody>
            {filteredData.map((item, index) => (
                <tr key={index}>
                    {Object.keys(visibleColumns).filter(key => visibleColumns[key]).map(column => (
                        <td key={column} onClick={() => (column === 'cust_name' && (type === 'agent' || type === 'dirigent')) || (column === 'agent_name' && (type === 'customer' || type === 'dirigent')) ? handleRowClick(item, column) : null}>
                            {(column === 'cust_name' && (type === 'agent' || type === 'dirigent')) || (column === 'agent_name' && (type === 'customer' || type === 'dirigent')) ?
                                <a href="#!" style={{ color: 'blue' }}>{item[column]}</a> : item[column]}
                        </td>
                    ))}
                    {(type === 'agent' || type === 'dirigent') && (
                        <td>
                            <button className="button" onClick={(e) => { e.stopPropagation(); handleEdit(item); }}>Edit</button>
                        </td>
                    )}
                </tr>
            ))}
            </tbody>
        </table>
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
