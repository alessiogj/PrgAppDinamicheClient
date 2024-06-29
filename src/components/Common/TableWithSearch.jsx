import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import '../../styles/TableWithSearch.css';
import {deleteOrder, getOrders, putOrder} from '../Services/OrderService';

function TableWithSearch({ initialData, type }) {
    const [search, setSearch] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [selectedDetails, setSelectedDetails] = useState(null);
    const token = localStorage.getItem('jwtToken');
    const [visibleColumns, setVisibleColumns] = useState({
        ord_num: true,
        ord_amount: true,
        advance_amount: true,
        order_date: true,
        cust_name: type === 'agent',
        agent_name: type === 'customer',
        commission: type === 'customer'
    });
    const [editElement, setEditElement] = useState(null);

    const columnDefinitions = useMemo(() => ({
        ord_num: { displayName: 'Order Number', type: 'number' },
        ord_amount: { displayName: 'Order Amount', type: 'number' },
        advance_amount: { displayName: 'Advance Amount', type: 'number' },
        order_date: { displayName: 'Order Date', type: 'string' },
        cust_name: { displayName: 'Customer Name', type: 'string' },
        agent_name: { displayName: 'Agent Name', type: 'string' },
        commission: { displayName: 'Commission', type: 'number' }
    }), []);

    const processedData = useMemo(() => {
        return initialData.map(item => {
            const [date, time] = item.ord_date.split('T');
            return {
                ...item,
                order_date: date
            };
        });
    }, [initialData]);

    const filteredData = useMemo(() => {
        let sortableItems = [...processedData];
        if (sortConfig.key) {
            sortableItems.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];

                if (columnDefinitions[sortConfig.key].type === 'number') {
                    return sortConfig.direction === 'ascending'
                        ? (parseFloat(aValue) || 0) - (parseFloat(bValue) || 0)
                        : (parseFloat(bValue) || 0) - (parseFloat(aValue) || 0);
                } else {
                    const aStr = aValue?.toString().toLowerCase() || '';
                    const bStr = bValue?.toString().toLowerCase() || '';
                    return sortConfig.direction === 'ascending'
                        ? aStr.localeCompare(bStr)
                        : bStr.localeCompare(aStr);
                }
            });
        }
        const searchString = search.toLowerCase();
        return sortableItems.filter(item =>
            Object.keys(visibleColumns).some(column =>
                visibleColumns[column] && item[column]?.toString().toLowerCase().includes(searchString)
            )
        );
    }, [processedData, sortConfig, search, visibleColumns, columnDefinitions]);

    const handleSort = useCallback((key) => {
        setSortConfig(prevConfig => ({
            key,
            direction: prevConfig.key === key && prevConfig.direction === 'ascending' ? 'descending' : 'ascending'
        }));
    }, []);

    const handleRowClick = useCallback((item) => {
        const details = type === 'agent' ? {
            'Order Description': item.ord_description || 'N/A',
            'Customer Code': item.cust_code || 'Unknown',
            'Customer City': item.cust_city || 'N/A',
            'Working Area': item.working_area || 'N/A',
            'Customer Country': item.cust_country || 'N/A',
            'Grade': item.grade || 'N/A',
            'Opening Amount': item.opening_amt || '0.00',
            'Receive Amount': item.receive_amt || '0.00',
            'Payment Amount': item.payment_amt || '0.00',
            'Outstanding Amount': item.outstanding_amt || '0.00',
            'Phone Number': item.phone_no || 'N/A'
        } : {
            'Order Description': item.ord_description || 'N/A',
            'Country': item.country || 'N/A',
            'Agent Code': item.agent_code || 'N/A',
            'Working Area': item.working_area || 'N/A',
            'Phone Number': item.phone_no || 'N/A'
        };
        setSelectedDetails(details);
    }, [type]);

    const handleColumnVisibilityChange = useCallback((column) => {
        setVisibleColumns(prevVisibleColumns => ({
            ...prevVisibleColumns,
            [column]: !prevVisibleColumns[column]
        }));
    }, []);

    const handleEdit = useCallback((item) => {
        if (type === 'agent') {
            setEditElement(item);
        }
    }, [type]);

    const handleConfirmEdit = useCallback(async () => {
        const element =
        {
            modifiedOrder : {
                ord_num: Number(editElement.ord_num),
                ord_amount: Number(editElement.ord_amount),
                advance_amount: Number(editElement.advance_amount),
                ord_date: editElement.ord_date,
                cust_code: editElement.cust_code,
                agent_code: editElement.agent_code,
                ord_description: editElement.ord_description
            }
        }
        await putOrder(token, element);
        setEditElement(null);
        window.location.reload();
    }, [editElement]);

    const handleConfirmDelete = useCallback(async () => {
        const element =
            {
                ord_num: Number(editElement.ord_num)
            }
        await deleteOrder(token, element);
        setEditElement(null);
        //force refresh
        window.location.reload();
    }, [editElement]);

    const handleInputChange = (key, value) => {
        setEditElement(prev => ({ ...prev, [key]: value }));
    };

    const displayNames = {
        ord_amount: 'Order Amount',
        advance_amount: 'Advance Amount',
        order_date: 'Order Date',
        ord_description: 'Order description'
    };

    return (
        <div className="table-container">
            <div className="controls">
                <input
                    type="text"
                    placeholder={"Search..."}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="search-input"
                />
                <div className="filter-checkboxes">
                    {Object.keys(columnDefinitions).map(column => (
                        ((column !== 'cust_name' || type === 'agent') &&
                            (column !== 'agent_name' && column !== 'commission' || type === 'customer')) && (
                            <label key={column}>
                                <input
                                    type="checkbox"
                                    checked={visibleColumns[column]}
                                    onChange={() => handleColumnVisibilityChange(column)}
                                />
                                {columnDefinitions[column].displayName}
                            </label>
                        )
                    ))}
                </div>
            </div>
            <table className="data-table">
                <thead>
                <tr>
                    {Object.keys(visibleColumns).filter(key => visibleColumns[key]).map(column => (
                        <th key={column} onClick={() => handleSort(column)}>
                            {columnDefinitions[column].displayName}
                        </th>
                    ))}
                    {type === 'agent' && <th>Actions</th>}
                </tr>
                </thead>
                <tbody>
                {filteredData.map((item, index) => (
                    <tr key={index}>
                        {Object.keys(visibleColumns).filter(key => visibleColumns[key]).map(column => (
                            <td key={column} onClick={() => (column === 'cust_name' && type === 'agent') || (column === 'agent_name' && type === 'customer') ? handleRowClick(item) : null}>
                                {(column === 'cust_name' && type === 'agent') || (column === 'agent_name' && type === 'customer') ?
                                    <a href="#!" style={{ color: 'blue' }}>{item[column]}</a> : item[column]}
                            </td>
                        ))}
                        {type === 'agent' && (
                            <td>
                                <button className="button" onClick={(e) => { e.stopPropagation(); handleEdit(item); }}>Edit</button>
                            </td>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
            {selectedDetails && (
                <div className="info-details">
                    <h3>{type === 'agent' ? 'Customer Details' : 'Agent Details'}</h3>
                    {Object.keys(selectedDetails).map(key => (
                        <p key={key}><strong>{key}:</strong> {selectedDetails[key]}</p>
                    ))}
                    <button onClick={() => setSelectedDetails(null)} className="button">Close</button>
                </div>
            )}
            {editElement && (
                <div className="info-details">
                    <h3>Edit Element</h3>
                    {}
                    {Object.keys(editElement).map(key => (
                        ['ord_amount', 'advance_amount', 'order_date', 'ord_description'].includes(key) && (
                            <p key={key}>
                                <strong>{displayNames[key]}:</strong>
                                <input
                                    type="text"
                                    value={editElement[key]}
                                    onChange={e => handleInputChange(key, e.target.value)}
                                />
                            </p>
                        )
                    ))}
                    <button onClick={handleConfirmDelete} className="button">Delete</button>
                    <button onClick={handleConfirmEdit} className="button">Confirm</button>
                    <button onClick={() => setEditElement(null)} className="button">Cancel</button>
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
