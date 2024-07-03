import { useCallback } from 'react';

export const useTableActions = (type, setEditElement, setShowAddOrderPanel, setShowTable, setSelectedDetails) => {
    const handleRowClick = useCallback((item, column) => {
        setShowAddOrderPanel(false);
        setEditElement(null);
        setShowTable(false);

        if (type === 'dirigent') {
            if (column === 'cust_name') {
                const details = {
                    'Order Description': item.ord_description || '',
                    'Code': item.cust_custcode || 'Unknown',
                    'Name': item.cust_name || 'Unknown',
                    'City': item.cust_city || 'Unknown',
                    'Working Area': item.cust_workingarea || 'Unknown',
                    'Country': item.cust_country || 'Unknown',
                    'Grade': item.grade || 'Unknown',
                    'Opening Amount': item.opening_amt || 'Unknown',
                    'Receive Amount': item.receive_amt || 'Unknown',
                    'Payment Amount': item.payment_amt || 'Unknown',
                    'Outstanding Amount': item.outstanding_amt || 'Unknown',
                    'Phone Number': item.cust_phoneno || 'Unknown',
                    'Agent Code': item.cust_agentcode || 'Unknown',
                };
                setSelectedDetails({ details, description: 'Customer Details' });
            } else if (column === 'agent_name') {
                const details = {
                    'Order Description': item.ord_description || '',
                    'Code': item.agent_agentcode || 'Unknown',
                    'Name': item.agent_name || 'Unknown',
                    'Working Area': item.agent_workingarea || 'Unknown',
                    'Commission': item.commission || 'Unknown',
                    'Phone Number': item.agent_phoneno || 'Unknown',
                    'Country': item.agent_country || 'Unknown'
                };
                setSelectedDetails({ details, description: 'Agent Details' });
            }
        } else {
            const details = type === 'agent' ? {
                'Order Description': item.ord_description || '',
                'Code': item.cust_code || 'Unknown',
                'Name': item.cust_name || 'Unknown',
                'City': item.cust_city || 'Unknown',
                'Working Area': item.working_area || 'Unknown',
                'Country': item.cust_country || 'Unknown',
                'Grade': item.grade || 'Unknown',
                'Opening Amount': item.opening_amt || 'Unknown',
                'Receive Amount': item.receive_amt || 'Unknown',
                'Payment Amount': item.payment_amt || 'Unknown',
                'Outstanding Amount': item.outstanding_amt || 'Unknown',
                'Phone Number': item.phone_no || 'Unknown',
                'Agent Code': item.cust_agentcode || 'Unknown',
            } : {
                'Order Description': item.ord_description || '',
                'Code': item.agent_code || 'Unknown',
                'Name': item.agent_name || 'Unknown',
                'Working Area': item.working_area || 'Unknown',
                'Commission': item.commission || 'Unknown',
                'Phone Number': item.phone_no || 'Unknown',
                'Country': item.country || 'Unknown'
            };
            setSelectedDetails({ details, description: type === 'agent' ? 'Customer Details' : 'Agent Details' });
        }
    }, [setEditElement, setSelectedDetails, setShowAddOrderPanel, setShowTable, type]);

    const handleEdit = useCallback((item) => {
        if (type === 'agent' || type === 'dirigent') {
            setShowAddOrderPanel(false);
            setSelectedDetails(null);
            setEditElement(item);
            setShowTable(false);
        }
    }, [setEditElement, setSelectedDetails, setShowAddOrderPanel, setShowTable, type]);

    const handleInputChange = (setElement) => (key, value) => {
        setElement(prev => ({ ...prev, [key]: value }));
    };

    const handleAddOrder = useCallback(() => {
        setShowAddOrderPanel(true);
        setSelectedDetails(null);
        setEditElement(null);
        setShowTable(false);
    }, [setEditElement, setSelectedDetails, setShowAddOrderPanel, setShowTable]);

    const handleCancel = (initialState, setElement, setShowTable, setPanelState) => () => {
        setElement(initialState);
        setPanelState(false);
        setShowTable(true);
    };

    return {
        handleRowClick,
        handleEdit,
        handleInputChange,
        handleAddOrder,
        handleCancel,
    };
};
