// src/components/TableWithSearch.js

import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import '../../styles/TableWithSearch.css';

function TableWithSearch({ initialData }) {
    const [search, setSearch] = useState('');
    const [visibleColumns, setVisibleColumns] = useState({
        ORD_NUM: true,
        ORD_AMOUNT: true,
        ADVANCE_AMOUNT: true,
        ORD_DATE: true,
        CUST_CODE: true,
        AGENT_CODE: true,
        ORD_DESCRIPTION: true
    });
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [data] = useState(initialData);
    const [selectedAgent, setSelectedAgent] = useState(null);

    const handleVisibleColumnsChange = (field) => {
        setVisibleColumns({
            ...visibleColumns,
            [field]: !visibleColumns[field]
        });
    };

    const handleSelectAll = () => {
        const allTrue = Object.keys(visibleColumns).every(key => visibleColumns[key]);
        setVisibleColumns(Object.keys(visibleColumns).reduce((acc, key) => ({ ...acc, [key]: !allTrue }), {}));
    };

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedData = useMemo(() => {
        let sortableItems = [...data];
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [data, sortConfig]);

    const filteredData = useMemo(() => {
        return sortedData.filter(item => {
            const itemString = JSON.stringify(item).toLowerCase();
            const searchString = search.toLowerCase();

            if (!search) return true;

            if (Object.keys(visibleColumns).every(key => visibleColumns[key])) {
                return itemString.includes(searchString);
            } else {
                return Object.keys(visibleColumns).some(key => visibleColumns[key] && item[key].toString().toLowerCase().includes(searchString));
            }
        });
    }, [search, visibleColumns, sortedData]);

    const agentDetails = {
        A0001: { name: 'John Doe', phone: '123-456-7890', email: 'john.doe@example.com' },
        A0002: { name: 'Jane Smith', phone: '987-654-3210', email: 'jane.smith@example.com' }
    };

    return (
        <div className="table-container">
            <div className="controls">
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-input"
                    aria-label="Search"
                />
                <div className="buttons">
                    <button onClick={handleSelectAll} className="button">
                        {Object.keys(visibleColumns).every(key => visibleColumns[key]) ? 'Deselect All' : 'Select All'}
                    </button>
                </div>
                <div className="filter-checkboxes">
                    {Object.keys(visibleColumns).map((column) => (
                        <label key={column}>
                            <input
                                type="checkbox"
                                checked={visibleColumns[column]}
                                onChange={() => handleVisibleColumnsChange(column)}
                            />
                            {column.replace('_', ' ')}
                        </label>
                    ))}
                </div>
            </div>
            <table className="data-table">
                <thead>
                <tr>
                    {visibleColumns.ORD_NUM && <th onClick={() => handleSort('ORD_NUM')}>Order Number</th>}
                    {visibleColumns.ORD_AMOUNT && <th onClick={() => handleSort('ORD_AMOUNT')}>Order Amount</th>}
                    {visibleColumns.ADVANCE_AMOUNT && <th onClick={() => handleSort('ADVANCE_AMOUNT')}>Advance Amount</th>}
                    {visibleColumns.ORD_DATE && <th onClick={() => handleSort('ORD_DATE')}>Order Date</th>}
                    {visibleColumns.CUST_CODE && <th onClick={() => handleSort('CUST_CODE')}>Customer Code</th>}
                    {visibleColumns.AGENT_CODE && <th onClick={() => handleSort('AGENT_CODE')}>Agent Code</th>}
                    {visibleColumns.ORD_DESCRIPTION && <th onClick={() => handleSort('ORD_DESCRIPTION')}>Description</th>}
                </tr>
                </thead>
                <tbody>
                {filteredData.map(item => (
                    <tr key={item.ORD_NUM}>
                        {visibleColumns.ORD_NUM && <td>{item.ORD_NUM}</td>}
                        {visibleColumns.ORD_AMOUNT && <td>{item.ORD_AMOUNT}</td>}
                        {visibleColumns.ADVANCE_AMOUNT && <td>{item.ADVANCE_AMOUNT}</td>}
                        {visibleColumns.ORD_DATE && <td>{item.ORD_DATE}</td>}
                        {visibleColumns.CUST_CODE && <td>{item.CUST_CODE}</td>}
                        {visibleColumns.AGENT_CODE && (
                            <td>
                                <a href="#!" onClick={() => setSelectedAgent(agentDetails[item.AGENT_CODE])}>
                                    {item.AGENT_CODE}
                                </a>
                            </td>
                        )}
                        {visibleColumns.ORD_DESCRIPTION && <td>{item.ORD_DESCRIPTION}</td>}
                    </tr>
                ))}
                </tbody>
            </table>
            {selectedAgent && (
                <div className="agent-details">
                    <h3>Agent Details</h3>
                    <p><strong>Name:</strong> {selectedAgent.name}</p>
                    <p><strong>Phone:</strong> {selectedAgent.phone}</p>
                    <p><strong>Email:</strong> {selectedAgent.email}</p>
                    <button onClick={() => setSelectedAgent(null)} className="button">Close</button>
                </div>
            )}
        </div>
    );
}

TableWithSearch.propTypes = {
    initialData: PropTypes.arrayOf(
        PropTypes.shape({
            ORD_NUM: PropTypes.number.isRequired,
            ORD_AMOUNT: PropTypes.number.isRequired,
            ADVANCE_AMOUNT: PropTypes.number.isRequired,
            ORD_DATE: PropTypes.string.isRequired,
            CUST_CODE: PropTypes.string.isRequired,
            AGENT_CODE: PropTypes.string.isRequired,
            ORD_DESCRIPTION: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default TableWithSearch;
