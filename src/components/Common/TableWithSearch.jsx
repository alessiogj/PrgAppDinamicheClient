import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/TableWithSearch.css';
import SearchBar from './SearchBar';
import FilterCheckboxes from './FilterCheckboxes';
import DataTable from './DataTable';
import DetailsPanel from './DetailsPanel';
import EditPanel from './EditPanel';
import AddOrderPanel from './AddOrderPanel';
import { useOrderData } from '../hooks/useOrderData';
import { useTableFilters } from '../hooks/useTableFilters';

function TableWithSearch({ initialData, type, userCode }) {
    const token = localStorage.getItem('jwtToken');
    const {
        orderData,
        editElement,
        setEditElement,
        addElement,
        setAddElement,
        showAddOrderPanel,
        setShowAddOrderPanel,
        handleConfirmEdit,
        handleConfirmDelete,
        handleConfirmAdd
    } = useOrderData(initialData, type, userCode);

    const columnDefinitions = useMemo(() => ({
        ord_num: { displayName: 'Order Number', type: 'number' },
        ord_amount: { displayName: 'Order Amount', type: 'number' },
        advance_amount: { displayName: 'Advance Amount', type: 'number' },
        order_date: { displayName: 'Order Date', type: 'string' },
        cust_name: { displayName: 'Customer Name', type: 'string' },
        agent_name: { displayName: 'Agent Name', type: 'string' },
        commission: { displayName: 'Commission', type: 'number' }
    }), []);

    const {
        search,
        setSearch,
        visibleColumns,
        handleSort,
        handleColumnVisibilityChange,
        filteredData
    } = useTableFilters(orderData, columnDefinitions, type);

    const [selectedDetails, setSelectedDetails] = useState(null);

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
    }, [setEditElement, setShowAddOrderPanel, type]);

    const handleEdit = useCallback((item) => {
        if (type === 'agent') {
            setShowAddOrderPanel(false);
            setSelectedDetails(null);
            setEditElement(item);
        }
    }, [setEditElement, setShowAddOrderPanel, type]);

    const handleInputChange = (key, value) => {
        setEditElement(prev => ({ ...prev, [key]: value }));
    };

    const handleAddOrderInputChange = (key, value) => {
        setAddElement(prev => ({ ...prev, [key]: value }));
    };

    const handleAddOrder = () => {
        setShowAddOrderPanel(true);
        setSelectedDetails(null);
        setEditElement(null);
    };

    const handleCancelEdit = () => {
        setEditElement(null);
    };

    const handleCancelAdd = () => {
        setShowAddOrderPanel(false);
        setAddElement({
            ord_num: '',
            ord_amount: '',
            advance_amount: '',
            order_date: '',
            cust_code: '',
            ord_description: ''
        });
    };

    const displayNames = {
        ord_num: 'Order Number',
        ord_amount: 'Order Amount',
        advance_amount: 'Advance Amount',
        order_date: 'Order Date',
        cust_code: 'Customer Code',
        ord_description: 'Order Description'
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
                    onCancel={handleCancelEdit}
                    token={token}
                />
            )}
            {showAddOrderPanel && !editElement && (
                <AddOrderPanel
                    addElement={addElement}
                    displayNames={displayNames}
                    handleInputChange={handleAddOrderInputChange}
                    handleConfirmAdd={handleConfirmAdd}
                    onCancel={handleCancelAdd}
                    token={token}
                />
            )}
        </div>
    );
}

TableWithSearch.propTypes = {
    initialData: PropTypes.array.isRequired,
    type: PropTypes.oneOf(['agent', 'customer', 'dirigent']).isRequired,
    userCode: PropTypes.string
};

export default TableWithSearch;
