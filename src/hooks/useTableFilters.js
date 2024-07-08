import { useMemo, useState, useCallback, useEffect } from 'react';

/**
 * Hook personalizzato per la gestione dei filtri della tabella.
 * @param {Array} orderData - Dati degli ordini.
 * @param {Object} columnDefinitions - Definizioni delle colonne della tabella.
 * @param {string} type - Tipo di utente (es. 'agent', 'customer', 'dirigent').
 * @returns {Object} - Oggetto contenente variabili e funzioni per gestire i filtri della tabella.
 */
export const useTableFilters = (orderData, columnDefinitions, type) => {
    const initialVisibleColumns = useMemo(() => ({
        ord_num: true,
        ord_amount: true,
        advance_amount: true,
        ord_date: true,
        cust_name: type === 'agent' || type === 'dirigent',
        agent_name: type === 'customer' || type === 'dirigent',
        description: true,
    }), [type]);

    const getSessionSortConfig = () => {
        const savedSortConfig = sessionStorage.getItem('sortConfig');
        return savedSortConfig ? JSON.parse(savedSortConfig) : { key: null, direction: 'ascending' };
    };

    const [sortConfig, setSortConfig] = useState(getSessionSortConfig);
    const [search, setSearch] = useState('');
    const [visibleColumns, setVisibleColumns] = useState(initialVisibleColumns);

    useEffect(() => {
        sessionStorage.setItem('sortConfig', JSON.stringify(sortConfig));
    }, [sortConfig]);

    const processedData = useMemo(() =>
        orderData.map(item => ({
            ...item,
            ord_date: item.ord_date ? item.ord_date.split('T')[0] : 'N/A',
        })), [orderData]);

    const filteredData = useMemo(() => {
        let sortableItems = [...processedData];

        if (sortConfig.key) {
            sortableItems.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];

                if (columnDefinitions[sortConfig.key].type === 'number') {
                    return sortConfig.direction === 'ascending'
                        ? parseFloat(aValue) - parseFloat(bValue)
                        : parseFloat(bValue) - parseFloat(aValue);
                } else {
                    return sortConfig.direction === 'ascending'
                        ? aValue.localeCompare(bValue)
                        : bValue.localeCompare(aValue);
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

    const handleSort = useCallback((key, direction) => {
        setSortConfig({ key, direction: direction || (sortConfig.key === key && sortConfig.direction === 'ascending' ? 'descending' : 'ascending') });
    }, [sortConfig]);

    const handleColumnVisibilityChange = useCallback(column => {
        setVisibleColumns(prev => ({ ...prev, [column]: !prev[column] }));
    }, []);

    return {
        search, setSearch,
        sortConfig, setSortConfig,
        visibleColumns, setVisibleColumns,
        handleSort, handleColumnVisibilityChange,
        filteredData
    };
};
