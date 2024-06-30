import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import '../../styles/TableWithSearch.css';
import { deleteOrder, putOrder, postOrder } from '../Services/OrderService';
import SearchBar from './SearchBar';
import FilterCheckboxes from './FilterCheckboxes';
import DataTable from './DataTable';
import DetailsPanel from './DetailsPanel';
import EditPanel from './EditPanel';
import AddOrderPanel from './AddOrderPanel';
import PopupMessage from './PopupMessage';
import '../../styles/PopupMessage.css';
import {formatDate} from "../utils/formatDate";

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
    const [showAddOrderPanel, setShowAddOrderPanel] = useState(false);
    const [popupMessage, setPopupMessage] = useState(null);
    const [addElement, setAddElement] = useState({
        ord_num: '',
        ord_amount: '',
        advance_amount: '',
        order_date: '',
        cust_code: '',
        ord_description: ''
    });

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
        setShowAddOrderPanel(false);
        setEditElement(null);
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
            setShowAddOrderPanel(false);
            setSelectedDetails(null);
            setEditElement(item);
        }
    }, [type]);

    const handleConfirmEdit = useCallback(async () => {
        try {
            const element = {
                modifiedOrder: {
                    ord_num: Number(editElement.ord_num),
                    ord_amount: Number(editElement.ord_amount),
                    advance_amount: Number(editElement.advance_amount),
                    ord_date: editElement.order_date,
                    cust_code: editElement.cust_code,
                    agent_code: editElement.agent_code,
                    ord_description: editElement.ord_description
                }
            };
            await putOrder(token, element);
            setPopupMessage({ type: 'success', text: 'Order updated successfully!' });
        } catch (error) {
            setPopupMessage({ type: 'error', text: 'Failed to update order. Please try again.' });
        }
        setEditElement(null);
        window.location.reload();
    }, [editElement, token]);

    const handleConfirmDelete = useCallback(async () => {
        try {
            const element = {
                ord_num: Number(editElement.ord_num)
            };
            await deleteOrder(token, element);
            setPopupMessage({ type: 'success', text: 'Order deleted successfully!' });
        } catch (error) {
            setPopupMessage({ type: 'error', text: 'Failed to delete order. Please try again.' });
        }
        setEditElement(null);
        window.location.reload();
    }, [editElement, token]);

    const handleInputChange = (key, value) => {
        setEditElement(prev => ({ ...prev, [key]: value }));
    };

    const handleAddOrderInputChange = (key, value) => {
        setAddElement(prev => ({ ...prev, [key]: value }));
    };

    const handleConfirmAdd = useCallback(async () => {
        try {
            const order = {
                newOrder: {
                    ord_num: Number(addElement.ord_num),
                    ord_amount: Number(addElement.ord_amount),
                    advance_amount: Number(addElement.advance_amount),
                    ord_date: addElement.order_date,
                    cust_code: addElement.cust_code,
                    agent_code: initialData[0]?.agent_code,  // preleviamo agent_code da initialData
                    ord_description: addElement.ord_description
                }
            };
            await postOrder(token, order);
            setPopupMessage({ type: 'success', text: 'Order added successfully!' });
        } catch (error) {
            setPopupMessage({ type: 'error', text: 'Failed to add order. Please try again.' });
        }
        setShowAddOrderPanel(false);
        window.location.reload();
    }, [token, addElement, initialData]);

    const displayNames = {
        ord_num: 'Order Number',
        ord_amount: 'Order Amount',
        advance_amount: 'Advance Amount',
        order_date: 'Order Date',
        cust_code: 'Customer Code',
        ord_description: 'Order Description'
    };

    const handleAddOrder = () => {
        setShowAddOrderPanel(true);
        setSelectedDetails(null);
        setEditElement(null);
    };

    return (
        <div className="table-container">
            <div className="controls">
                <SearchBar search={search} onSearchChange={setSearch} />
                <FilterCheckboxes
                    columnDefinitions={columnDefinitions}
                    visibleColumns={visibleColumns}
                    handleColumnVisibilityChange={handleColumnVisibilityChange}
                    type={type}
                />
                {type === 'agent' && <button onClick={handleAddOrder} className="button">Add Order</button>}
            </div>
            <DataTable
                filteredData={filteredData}
                visibleColumns={visibleColumns}
                columnDefinitions={columnDefinitions}
                handleSort={handleSort}
                handleRowClick={handleRowClick}
                handleEdit={handleEdit}
                type={type}
            />
            {selectedDetails && !showAddOrderPanel && !editElement && (
                <DetailsPanel
                    selectedDetails={selectedDetails}
                    type={type}
                    onClose={() => setSelectedDetails(null)}
                />
            )}
            {editElement && !showAddOrderPanel && (
                <EditPanel
                    editElement={editElement}
                    displayNames={displayNames}
                    handleInputChange={handleInputChange}
                    handleConfirmEdit={handleConfirmEdit}
                    handleConfirmDelete={handleConfirmDelete}
                    onCancel={() => setEditElement(null)}
                />
            )}
            {showAddOrderPanel && !editElement && (
                <AddOrderPanel
                    addElement={addElement}
                    displayNames={displayNames}
                    handleInputChange={handleAddOrderInputChange}
                    handleConfirmAdd={handleConfirmAdd}
                    onCancel={() => setShowAddOrderPanel(false)}
                />
            )}
            {popupMessage && (
                <PopupMessage
                    message={popupMessage}
                    onClose={() => setPopupMessage(null)}
                />
            )}
        </div>
    );
}

TableWithSearch.propTypes = {
    initialData: PropTypes.array.isRequired,
    type: PropTypes.oneOf(['agent', 'customer']).isRequired
};

export default TableWithSearch;
