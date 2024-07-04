import { useCallback } from 'react';

export const useTableActions = (
    type,
    setEditElement,
    setShowAddOrderPanel,
    setShowTable,
    setSelectedDetails,
    setShowDescription
) => {
    const handleRowClick = useCallback((item, column) => {
        setShowAddOrderPanel(false);
        setEditElement(null);
        setShowTable(false);
        setShowDescription(false);

        if (type === 'dirigent') {
            if (column === 'cust_name') {
                const details = {
                    'Codice': item.cust_custcode || 'Unknown',
                    'Nome': item.cust_name || 'Unknown',
                    'Città': item.cust_city || 'Unknown',
                    'Area di Lavoro': item.cust_workingarea || 'Unknown',
                    'Stato': item.cust_country || 'Unknown',
                    'Livello': item.grade || 'Unknown',
                    'Initial Amount': item.opening_amt || 'Unknown',
                    'Importo Ricevuto': item.receive_amt || 'Unknown',
                    'Importo Pagato': item.payment_amt || 'Unknown',
                    'Importo Residuo': item.outstanding_amt || 'Unknown',
                    'Numero di Telefono': item.cust_phoneno || 'Unknown',
                };
                setSelectedDetails({ details, description: 'Dettagli cliente' });
            } else if (column === 'agent_name') {
                const details = {
                    'Codice': item.agent_agentcode || 'Unknown',
                    'Nome': item.agent_name || 'Unknown',
                    'Area di lavoro': item.agent_workingarea || 'Unknown',
                    'Commissione': item.commission || 'Unknown',
                    'Numero di Telefono': item.agent_phoneno || 'Unknown',
                    'Stato': item.agent_country || 'Unknown',
                };
                setSelectedDetails({ details, description: 'Dettagli agente' });
            }
        } else {
            const details = type === 'agent' ? {
                'Codice': item.cust_code || 'Unknown',
                'Nome': item.cust_name || 'Unknown',
                'Città': item.cust_city || 'Unknown',
                'Area di Lavoro': item.working_area || 'Unknown',
                'Stato': item.cust_country || 'Unknown',
                'Livello': item.grade || 'Unknown',
                'Import di Apertura': item.opening_amt || 'Unknown',
                'Import Ricevuto': item.receive_amt || 'Unknown',
                'Import Pagato': item.payment_amt || 'Unknown',
                'Importo Residuo': item.outstanding_amt || 'Unknown',
                'Numero di Telefono': item.phone_no || 'Unknown',
            } : {
                'Codice': item.agent_code || 'Unknown',
                'Nome': item.agent_name || 'Unknown',
                'Area di lavoro': item.working_area || 'Unknown',
                'Commissione': item.commission || 'Unknown',
                'Numero di Telefono': item.phone_no || 'Unknown',
                'Stato': item.country || 'Unknown',
            };
            setSelectedDetails({ details, description: type === 'agent' ? 'Dettagli cliente' : 'Dettagli agente' });
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
        handleCancel
    };
};
