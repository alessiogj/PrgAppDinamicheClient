import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../../styles/TableWithSearch.css';

function TableWithSearch({ initialData, type }) {
    const [search, setSearch] = useState('');
    const [visibleColumns, setVisibleColumns] = useState({});
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [selectedDetails, setSelectedDetails] = useState(null);

    useEffect(() => {
        const convertDataTypes = (data) => {
            return data.map(item => ({
                ...item,
                ord_num: Number(item.ord_num),
                ord_amount: Number(item.ord_amount),
                advance_amount: Number(item.advance_amount),
                commission: item.commission ? Number(item.commission) : undefined
            }));
        };

        const processedData = convertDataTypes(initialData);

        if (processedData.length > 0) {
            const dynamicColumns = {};
            processedData.forEach(item => {
                Object.keys(item).forEach(key => {
                    if (
                        (type === 'agent' && key.match(/ord_num|ord_amount|advance_amount|ord_date|cust_code|ord_description/)) ||
                        (type === 'customer' && key.match(/ord_num|ord_description|advance_amount|agent_code|commission/))
                    ) {
                        dynamicColumns[key] = true;
                    }
                });
            });
            setVisibleColumns(dynamicColumns);
        }
    }, [initialData, type]);

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

    const handleRowClick = (item) => {
        if (type === 'customer') {
            setSelectedDetails({
                type: 'order',
                ord_num: item.ord_num,
                ord_amount: item.ord_amount,
                advance_amount: item.advance_amount,
                ord_date: new Date(item.ord_date).toLocaleDateString(),
                cust_code: item.cust_code,
                ord_description: item.ord_description,
            });
        } else if (type === 'agent') {
            setSelectedDetails({
                type: 'customer',
                cust_code: item.cust_code,
                name: item.cust_name || 'Unknown',
                phone: item.phone_no || 'N/A',
                email: item.cust_name ? `${item.cust_name.toLowerCase().replace(' ', '.')}@example.com` : 'N/A',
                working_area: item.working_area || 'N/A',
            });
        }
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
                    {visibleColumns.ord_num && <th onClick={() => handleSort('ord_num')}>Order Number</th>}
                    {visibleColumns.ord_amount && <th onClick={() => handleSort('ord_amount')}>Order Amount</th>}
                    {visibleColumns.advance_amount && <th onClick={() => handleSort('advance_amount')}>Advance Amount</th>}
                    {visibleColumns.ord_date && <th onClick={() => handleSort('ord_date')}>Order Date</th>}
                    {visibleColumns.cust_code && <th onClick={() => handleSort('cust_code')}>Customer Code</th>}
                    {visibleColumns.agent_code && <th onClick={() => handleSort('agent_code')}>Agent Code</th>}
                    {visibleColumns.ord_description && <th onClick={() => handleSort('ord_description')}>Description</th>}
                    {visibleColumns.commission && <th onClick={() => handleSort('commission')}>Commission</th>}
                </tr>
                </thead>
                <tbody>
                {filteredData.map((item, index) => (
                    <tr key={item.ord_num || index}>
                        {visibleColumns.ord_num && (
                            <td>
                                {type === 'customer' ? (
                                    <a href="#!" onClick={() => handleRowClick(item)}>
                                        {item.ord_num}
                                    </a>
                                ) : (
                                    item.ord_num
                                )}
                            </td>
                        )}
                        {visibleColumns.ord_amount && <td>{item.ord_amount}</td>}
                        {visibleColumns.advance_amount && <td>{item.advance_amount}</td>}
                        {visibleColumns.ord_date && <td>{new Date(item.ord_date).toLocaleDateString()}</td>}
                        {visibleColumns.cust_code && (
                            <td>
                                {type === 'agent' ? (
                                    <a href="#!" onClick={() => handleRowClick(item)}>
                                        {item.cust_code}
                                    </a>
                                ) : (
                                    item.cust_code
                                )}
                            </td>
                        )}
                        {visibleColumns.agent_code && <td>{item.agent_code.trim()}</td>}
                        {visibleColumns.ord_description && <td>{item.ord_description}</td>}
                        {visibleColumns.commission && <td>{item.commission}</td>}
                    </tr>
                ))}
                </tbody>
            </table>
            {selectedDetails && (
                <div className="details">
                    {selectedDetails.type === 'order' && (
                        <>
                            <h3>Order Details</h3>
                            <p><strong>Order Number:</strong> {selectedDetails.ord_num}</p>
                            <p><strong>Order Amount:</strong> {selectedDetails.ord_amount}</p>
                            <p><strong>Advance Amount:</strong> {selectedDetails.advance_amount}</p>
                            <p><strong>Order Date:</strong> {selectedDetails.ord_date}</p>
                            <p><strong>Customer Code:</strong> {selectedDetails.cust_code}</p>
                            <p><strong>Description:</strong> {selectedDetails.ord_description}</p>
                        </>
                    )}
                    {selectedDetails.type === 'customer' && (
                        <>
                            <h3>Customer Details</h3>
                            <p><strong>Customer Code:</strong> {selectedDetails.cust_code}</p>
                            <p><strong>Name:</strong> {selectedDetails.name}</p>
                            <p><strong>Phone:</strong> {selectedDetails.phone}</p>
                            <p><strong>Email:</strong> {selectedDetails.email}</p>
                            <p><strong>Working Area:</strong> {selectedDetails.working_area}</p>
                        </>
                    )}
                    <button onClick={() => setSelectedDetails(null)} className="button">Close</button>
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
            phone_no: PropTypes.string,
            agent_name: PropTypes.string,
            working_area: PropTypes.string,
            commission: PropTypes.string,
            country: PropTypes.string,
        })
    ).isRequired,
    type: PropTypes.oneOf(['agent', 'customer']).isRequired
};

export default TableWithSearch;
