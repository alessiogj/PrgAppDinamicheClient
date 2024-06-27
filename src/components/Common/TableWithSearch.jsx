import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../../styles/TableWithSearch.css';

function TableWithSearch({ initialData }) {
    const [search, setSearch] = useState('');
    const [visibleColumns, setVisibleColumns] = useState({});
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [agentDetails, setAgentDetails] = useState({});

    useEffect(() => {
        if (initialData.length > 0) {
            const dynamicColumns = {};
            initialData.forEach(item => {
                Object.keys(item).forEach(key => {
                    if (key.match(/ord_num|ord_amount|advance_amount|ord_date|cust_code|agent_code|ord_description/)) {
                        dynamicColumns[key] = true;
                    }
                });
            });
            setVisibleColumns(dynamicColumns);

            const agents = {};
            initialData.forEach(item => {
                if (item.agent_code) {
                    agents[item.agent_code.trim()] = {
                        name: item.cust_name || 'Unknown',
                        phone: item.phone_no || 'N/A',
                        email: item.cust_name ? `${item.cust_name.toLowerCase().replace(' ', '.')}@example.com` : 'N/A',
                        custCode: item.cust_code,
                        custDescription: item.ord_description
                    };
                }
            });
            setAgentDetails(agents);
        }
    }, [initialData]);

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
        let sortableItems = [...initialData];
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
    }, [initialData, sortConfig]);

    const filteredData = useMemo(() => {
        return sortedData.filter(item => {
            const itemString = JSON.stringify(item).toLowerCase();
            const searchString = search.toLowerCase();

            if (!search) return true;

            if (Object.keys(visibleColumns).every(key => visibleColumns[key])) {
                return itemString.includes(searchString);
            } else {
                return Object.keys(visibleColumns).some(key => visibleColumns[key] && item[key]?.toString().toLowerCase().includes(searchString));
            }
        });
    }, [search, visibleColumns, sortedData]);

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
                    {visibleColumns.ord_num && <th onClick={() => handleSort('ord_num')}>Order Number</th>}
                    {visibleColumns.ord_amount && <th onClick={() => handleSort('ord_amount')}>Order Amount</th>}
                    {visibleColumns.advance_amount && <th onClick={() => handleSort('advance_amount')}>Advance Amount</th>}
                    {visibleColumns.ord_date && <th onClick={() => handleSort('ord_date')}>Order Date</th>}
                    {visibleColumns.cust_code && <th onClick={() => handleSort('cust_code')}>Customer Code</th>}
                    {visibleColumns.agent_code && <th onClick={() => handleSort('agent_code')}>Agent Code</th>}
                    {visibleColumns.ord_description && <th onClick={() => handleSort('ord_description')}>Description</th>}
                </tr>
                </thead>
                <tbody>
                {filteredData.map((item, index) => (
                    <tr key={item.ord_num || index}>
                        {visibleColumns.ord_num && <td>{item.ord_num}</td>}
                        {visibleColumns.ord_amount && <td>{item.ord_amount}</td>}
                        {visibleColumns.advance_amount && <td>{item.advance_amount}</td>}
                        {visibleColumns.ord_date && <td>{new Date(item.ord_date).toLocaleDateString()}</td>}
                        {visibleColumns.cust_code && <td>{item.cust_code}</td>}
                        {visibleColumns.agent_code && (
                            <td>
                                <a href="#!" onClick={() => setSelectedCustomer(agentDetails[item.agent_code.trim()])}>
                                    {item.agent_code.trim()}
                                </a>
                            </td>
                        )}
                        {visibleColumns.ord_description && <td>{item.ord_description}</td>}
                    </tr>
                ))}
                </tbody>
            </table>
            {selectedCustomer && (
                <div className="agent-details">
                    <h3>Customer Details</h3>
                    <p><strong>Name:</strong> {selectedCustomer.name}</p>
                    <p><strong>Phone:</strong> {selectedCustomer.phone}</p>
                    <p><strong>Email:</strong> {selectedCustomer.email}</p>
                    <p><strong>Customer Code:</strong> {selectedCustomer.custCode}</p>
                    <p><strong>Description:</strong> {selectedCustomer.custDescription}</p>
                    <button onClick={() => setSelectedCustomer(null)} className="button">Close</button>
                </div>
            )}
        </div>
    );
}

TableWithSearch.propTypes = {
    initialData: PropTypes.arrayOf(
        PropTypes.shape({
            ord_num: PropTypes.number,
            ord_amount: PropTypes.number,
            advance_amount: PropTypes.number,
            ord_date: PropTypes.string,
            cust_code: PropTypes.string,
            agent_code: PropTypes.string,
            ord_description: PropTypes.string,
            cust_name: PropTypes.string,
            phone_no: PropTypes.string
        })
    ).isRequired,
};

export default TableWithSearch;
