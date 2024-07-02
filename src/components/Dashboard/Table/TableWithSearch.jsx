import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import '../../../styles/TableWithSearch.css';
import SearchBar from './SearchBar';
import FilterCheckboxes from './FilterCheckboxes';
import DataTable from './DataTable';
import EditPanel from './Panels/EditPanel';
import VisualizePanel from './Panels/VisualizePanel';
import AddOrderPanel from './Panels/AddOrderPanel';
import { useOrderData } from '../../../hooks/useOrderData';
import { useTableFilters } from '../../../hooks/useTableFilters';
import { useTableActions } from '../../../hooks/useTableActions';
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

    const {
        handleRowClick,
        handleEdit,
        handleInputChange,
        handleAddOrder,
        handleCancel,
    } = useTableActions(type, setEditElement, setShowAddOrderPanel, setShowTable, setSelectedDetails);

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
        agent_code: 'Agent Code',
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
                        element={selectedDetails}
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
                        handleInputChange={handleInputChange(setEditElement)}
                        handleConfirmEdit={handleConfirmEditWithUpdate}
                        handleConfirmDelete={handleConfirmDeleteWithUpdate}
                        onCancel={handleCancel(editElement, setEditElement, setShowTable, setEditElement)}
                        type={type}
                        token={token}
                    />
                </div>
            )}
            {showAddOrderPanel && !editElement && (
                <div className="info-card">
                    <AddOrderPanel
                        addElement={addElement}
                        displayNames={displayNames}
                        handleInputChange={handleInputChange(setAddElement)}
                        handleConfirmAdd={handleConfirmAddWithUpdate}
                        onCancel={handleCancel(addElement, setAddElement, setShowTable, setShowAddOrderPanel)}
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
