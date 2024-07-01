import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/TableWithSearch.css';
import SearchBar from './SearchBar';
import FilterCheckboxes from './FilterCheckboxes';
import DataTable from './DataTable';
import EditPanel from './EditPanel';
import VisualizePanel from './VisualizePanel';
import AddOrderPanel from './AddOrderPanel';
import { useOrderData } from '../hooks/useOrderData';
import { useTableFilters } from '../hooks/useTableFilters';
import { Button } from '@mui/material';

function TableWithSearch({ initialData, type, userCode, onUpdate }) {
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
        handleConfirmAdd,
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
    const [showTable, setShowTable] = useState(true);

    const handleRowClick = useCallback((item, column) => {
        setShowAddOrderPanel(false);
        setEditElement(null);
        setShowTable(false);

        if (type === 'dirigent') {
            if (column === 'cust_name') {
                const details = {
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
                };
                setSelectedDetails({ details, description: 'Customer Details' });
            } else if (column === 'agent_name') {
                const details = {
                    'Order Description': item.ord_description || 'N/A',
                    'Country': item.country || 'N/A',
                    'Agent Code': item.agent_code || 'N/A',
                    'Working Area': item.working_area || 'N/A',
                    'Phone Number': item.phone_no || 'N/A'
                };
                setSelectedDetails({ details, description: 'Agent Details' });
            }
        } else {
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
            setSelectedDetails({ details, description: type === 'agent' ? 'Customer Details' : 'Agent Details' });
        }
    }, [setEditElement, setShowAddOrderPanel, type]);

    const handleEdit = useCallback((item) => {
        if (type === 'agent' || type === 'dirigent') {
            setShowAddOrderPanel(false);
            setSelectedDetails(null);
            setEditElement(item);
            setShowTable(false);
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
        setShowTable(false);
    };

    const handleCancelEdit = () => {
        setEditElement(null);
        setShowTable(true);
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
        setShowTable(true);
    };

    const handleConfirmEditWithUpdate = async () => {
        await handleConfirmEdit();
        onUpdate();
        setShowTable(true);
    };

    const handleConfirmDeleteWithUpdate = async () => {
        await handleConfirmDelete();
        onUpdate();
        setShowTable(true);
    };

    const handleConfirmAddWithUpdate = async () => {
        await handleConfirmAdd();
        onUpdate();
        setShowTable(true);
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
                {type === 'agent' && <Button onClick={handleAddOrder} variant="contained" color="primary">Add Order</Button>}
            </div>
            {selectedDetails && !showAddOrderPanel && !editElement && (
                <div className="info-card">
                    <VisualizePanel
                        element={selectedDetails.details}
                        displayNames={displayNames}
                        onClose={() => {
                            setSelectedDetails(null);
                            setShowTable(true);
                        }}
                    />
                </div>
            )}
            {editElement && !showAddOrderPanel && (
                <div className="info-card">
                    <EditPanel
                        editElement={editElement}
                        displayNames={displayNames}
                        handleInputChange={handleInputChange}
                        handleConfirmEdit={handleConfirmEditWithUpdate}
                        handleConfirmDelete={handleConfirmDeleteWithUpdate}
                        onCancel={handleCancelEdit}
                        token={token}
                        type={type}
                    />
                </div>
            )}
            {showAddOrderPanel && !editElement && (
                <div className="info-card">
                    <AddOrderPanel
                        addElement={addElement}
                        displayNames={displayNames}
                        handleInputChange={handleAddOrderInputChange}
                        handleConfirmAdd={handleConfirmAddWithUpdate}
                        onCancel={handleCancelAdd}
                        token={token}
                    />
                </div>
            )}
            {showTable && (
                <div className="scrollable-table">
                    <DataTable
                        filteredData={filteredData}
                        visibleColumns={visibleColumns}
                        columnDefinitions={columnDefinitions}
                        handleSort={handleSort}
                        handleRowClick={handleRowClick}
                        handleEdit={handleEdit}
                        type={type}
                    />
                </div>
            )}
        </div>
    );
}

TableWithSearch.propTypes = {
    initialData: PropTypes.array.isRequired,
    type: PropTypes.oneOf(['agent', 'customer', 'dirigent']).isRequired,
    userCode: PropTypes.string,
    onUpdate: PropTypes.func.isRequired
};

export default TableWithSearch;
