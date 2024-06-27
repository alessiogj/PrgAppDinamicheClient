import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import '../../styles/TableWithSearch.css';

function TableWithSearch({ initialData, type }) {
    const [search, setSearch] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [selectedDetails, setSelectedDetails] = useState(null);

    const visibleColumns = useMemo(() => ({
        ord_num: { visible: true, fixed: true },
        ord_amount: { visible: true, fixed: true },
        advance_amount: { visible: true, fixed: true },
        ord_date: { visible: true, fixed: true },
        cust_code: { visible: type === 'agent', fixed: type === 'agent' },
        agent_code: { visible: type === 'customer', fixed: type === 'customer' },
        commission: { visible: type === 'customer', fixed: type === 'customer' }
    }), [type]);

    const filteredData = useMemo(() => {
        let sortableItems = [...initialData];
        if (sortConfig.key) {
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
        const searchString = search.toLowerCase();
        return sortableItems.filter(item => item.cust_code.toLowerCase().includes(searchString) || !search);
    }, [initialData, sortConfig, search]);

    const handleSort = useCallback((key) => {
        setSortConfig(prevConfig => ({
            key,
            direction: prevConfig.key === key && prevConfig.direction === 'ascending' ? 'descending' : 'ascending'
        }));
    }, []);

    const handleRowClick = useCallback((item) => {
        const details = type === 'agent' ? {
            ord_description: item.ord_description || 'N/A',
            cust_name: item.cust_name || 'Unknown',
            cust_city: item.cust_city || 'N/A',
            working_area: item.working_area || 'N/A',
            cust_country: item.cust_country || 'N/A',
            grade: item.grade || 'N/A',
            opening_amt: item.opening_amt || '0.00',
            receive_amt: item.receive_amt || '0.00',
            payment_amt: item.payment_amt || '0.00',
            outstanding_amt: item.outstanding_amt || '0.00',
            phone_no: item.phone_no || 'N/A'
        } : {
            ord_description: item.ord_description || 'N/A',
            agent_name: item.agent_name || 'Unknown',
            country : item.country || 'N/A',
            agent_code: item.agent_code || 'N/A',
            working_area: item.working_area || 'N/A',
            phone_no: item.phone_no || 'N/A'
        };
        setSelectedDetails(details);
    }, [type]);

    return (
        <div className="table-container">
            <div className="controls">
                <input
                    type="text"
                    placeholder={type === 'agent' ? "Search by Customer Code..." : "Search by Agent Code..."}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="search-input"
                />
            </div>
            <table className="data-table">
                <thead>
                <tr>
                    {Object.keys(visibleColumns).filter(key => visibleColumns[key].visible).map(column => (
                        <th key={column} onClick={() => handleSort(column)}>
                            {column.replace('_', ' ').toUpperCase()}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {filteredData.map((item, index) => (
                    <tr key={index}>
                        {Object.keys(visibleColumns).filter(key => visibleColumns[key].visible).map(column => (
                            <td key={column} onClick={() => (column === 'cust_code' && type === 'agent') || (column === 'agent_code' && type === 'customer') ? handleRowClick(item) : null}>
                                {(column === 'cust_code' && type === 'agent') || (column === 'agent_code' && type === 'customer') ?
                                    <a href="#!" style={{ color: 'blue' }}>{item[column]}</a> : item[column]}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
            {selectedDetails && (
                <div className="details">
                    <h3>{type === 'agent' ? 'Customer Details' : 'Agent Details'}</h3>
                    {Object.keys(selectedDetails).map(key => (
                        <p key={key}><strong>{key.replace('_', ' ').toUpperCase()}:</strong> {selectedDetails[key]}</p>
                    ))}
                    <button onClick={() => setSelectedDetails(null)} className="button">Close</button>
                </div>
            )}
        </div>
    );
}

TableWithSearch.propTypes = {
    initialData: PropTypes.array.isRequired,
    type: PropTypes.oneOf(['agent', 'customer']).isRequired
};

export default TableWithSearch;
