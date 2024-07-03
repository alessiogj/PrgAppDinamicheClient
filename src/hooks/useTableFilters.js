import { useMemo, useState, useCallback } from 'react';

/**
 * Hook personalizzato per la gestione dei filtri della tabella.
 * @param {Array} orderData - Dati degli ordini.
 * @param {Object} columnDefinitions - Definizioni delle colonne della tabella.
 * @param {string} type - Tipo di utente (es. 'agent', 'customer', 'dirigent').
 * @returns {Object} - Oggetto contenente variabili e funzioni per gestire i filtri della tabella.
 */
export const useTableFilters = (orderData, columnDefinitions, type) => {
    // Stato iniziale delle colonne visibili, dipendente dal tipo di utente
    const initialVisibleColumns = useMemo(() => ({
        ord_num: true,
        ord_amount: true,
        advance_amount: true,
        order_date: true,
        cust_name: type === 'agent' || type === 'dirigent',
        agent_name: type === 'customer' || type === 'dirigent',
    }), [type]);

    // Stato per la configurazione del sorting
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    // Stato per la ricerca
    const [search, setSearch] = useState('');

    // Stato per la visibilità delle colonne
    const [visibleColumns, setVisibleColumns] = useState(initialVisibleColumns);

    // Elaborazione iniziale dei dati: formattazione della data dell'ordine
    const processedData = useMemo(() =>
        orderData.map(item => ({
            ...item,
            order_date: item.ord_date ? item.ord_date.split('T')[0] : 'N/A',
        })), [orderData]);

    // Filtraggio e ordinamento dei dati
    const filteredData = useMemo(() => {
        let sortableItems = [...processedData];

        // Ordinamento dei dati in base alla configurazione del sorting
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

        // Filtraggio dei dati in base alla ricerca e alla visibilità delle colonne
        const searchString = search.toLowerCase();
        return sortableItems.filter(item =>
            Object.keys(visibleColumns).some(column =>
                visibleColumns[column] && item[column]?.toString().toLowerCase().includes(searchString)
            )
        );
    }, [processedData, sortConfig, search, visibleColumns, columnDefinitions]);

    // Funzione per gestire il sorting delle colonne
    const handleSort = useCallback(key => {
        setSortConfig(prevConfig => ({
            key,
            direction: prevConfig.key === key && prevConfig.direction === 'ascending' ? 'descending' : 'ascending'
        }));
    }, []);

    // Funzione per gestire la visibilità delle colonne
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
