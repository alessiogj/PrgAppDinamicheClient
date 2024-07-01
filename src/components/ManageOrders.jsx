// src/Common/ManageOrders.jsx
import React from 'react';
import TableWithSearch from './Common/TableWithSearch';

const ManageOrders = ({ tableData, userRole, userCode, onUpdate }) => {
    return (
        <div className="widget">
            <h2>Manage Orders</h2>
            <TableWithSearch
                initialData={tableData}
                type={userRole}
                userCode={userCode}
                onUpdate={onUpdate}
            />
        </div>
    );
};

export default ManageOrders;
