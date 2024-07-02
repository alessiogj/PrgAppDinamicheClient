import { useCallback } from 'react';

export const useTableActions = (type, setEditElement, setShowAddOrderPanel, setShowTable, setSelectedDetails) => {
    const handleRowClick = useCallback((item, column) => {
        setShowAddOrderPanel(false);
        setEditElement(null);
        setShowTable(false);

        if (type === 'dirigent') {
            if (column === 'cust_name') {
                const details = {
                    'Order Description': item.ord_description || 'N/A',
                    'Code': item.cust_custcode || 'Unknown',
                    'Name': item.cust_name || 'Unknown',
                    'City': item.cust_city || 'N/A',
                    'Working Area': item.cust_workingarea || 'N/A',
                    'Country': item.cust_country || 'N/A',
                    'Grade': item.grade || 'N/A',
                    'Opening Amount': item.opening_amt || '0.00',
                    'Receive Amount': item.receive_amt || '0.00',
                    'Payment Amount': item.payment_amt || '0.00',
                    'Outstanding Amount': item.outstanding_amt || '0.00',
                    'Phone Number': item.cust_phoneno || 'N/A',
                    'Agent Code': item.cust_agentcode || 'N/A',
                };
                setSelectedDetails({ details, description: 'Customer Details' });
            } else if (column === 'agent_name') {
                const details = {
                    'Order Description': item.ord_description || 'N/A',
                    'Code': item.agent_agentcode || 'N/A',
                    'Name': item.agent_name || 'Unknown',
                    'Working Area': item.agent_workingarea || 'N/A',
                    'Commission': item.commission || '0.00',
                    'Phone Number': item.agent_phoneno || 'N/A',
                    'Country': item.agent_country || 'N/A'
                };
                setSelectedDetails({ details, description: 'Agent Details' });
            }
        } else {
            const details = type === 'agent' ? {
                'Order Description': item.ord_description || 'N/A',
                'Code': item.cust_code || 'Unknown',
                'Name': item.cust_name || 'Unknown',
                'City': item.cust_city || 'N/A',
                'Working Area': item.working_area || 'N/A',
                'Country': item.cust_country || 'N/A',
                'Grade': item.grade || 'N/A',
                'Opening Amount': item.opening_amt || '0.00',
                'Receive Amount': item.receive_amt || '0.00',
                'Payment Amount': item.payment_amt || '0.00',
                'Outstanding Amount': item.outstanding_amt || '0.00',
                'Phone Number': item.phone_no || 'N/A',
                'Agent Code': item.cust_agentcode || 'N/A',
            } : {
                'Order Description': item.ord_description || 'N/A',
                'Code': item.agent_code || 'N/A',
                'Name': item.agent_name || 'Unknown',
                'Working Area': item.working_area || 'N/A',
                'Commission': item.commission || '0.00',
                'Phone Number': item.phone_no || 'N/A',
                'Country': item.country || 'N/A'
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

    const handleCancel = useCallback((userCode, setElement, setPanelState) => () => {
        setElement({
            agent_code: userCode,
            ord_amount: '',
            advance_amount: '',
            order_date: '',
            cust_code: '',
            ord_description: ''
        });
        setPanelState(false);
        setShowTable(true);
    }, [setShowTable]);

    return {
        handleRowClick,
        handleEdit,
        handleInputChange,
        handleAddOrder,
        handleCancel,
    };
};
