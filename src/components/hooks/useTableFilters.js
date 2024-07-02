import { useMemo, useState, useCallback } from 'react';

export const useTableFilters = (orderData, columnDefinitions, type) => {
    const initialVisibleColumns = useMemo(() => ({
        ord_num: true,
        ord_amount: true,
        advance_amount: true,
        order_date: true,
        cust_name: type === 'agent' || type === 'dirigent',
        agent_name: type === 'customer' || type === 'dirigent',
    }), [type]);

    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [search, setSearch] = useState('');
    const [visibleColumns, setVisibleColumns] = useState(initialVisibleColumns);

    const processedData = useMemo(() => orderData.map(item => ({
        ...item,
        order_date: item.ord_date ? item.ord_date.split('T')[0] : 'N/A',
    })), [orderData]);

    const filteredData = useMemo(() => {
        let sortableItems = [...processedData];
        if (sortConfig.key) {
            sortableItems.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];
                return columnDefinitions[sortConfig.key].type === 'number'
                    ? sortConfig.direction === 'ascending'
                        ? parseFloat(aValue) - parseFloat(bValue)
                        : parseFloat(bValue) - parseFloat(aValue)
                    : sortConfig.direction === 'ascending'
                        ? aValue.localeCompare(bValue)
                        : bValue.localeCompare(aValue);
            });
        }
        const searchString = search.toLowerCase();
        return sortableItems.filter(item => Object.keys(visibleColumns).some(column =>
            visibleColumns[column] && item[column]?.toString().toLowerCase().includes(searchString)
        ));
    }, [processedData, sortConfig, search, visibleColumns, columnDefinitions]);

    const handleSort = useCallback(key => {
        setSortConfig(prevConfig => ({
            key,
            direction: prevConfig.key === key && prevConfig.direction === 'ascending' ? 'descending' : 'ascending'
        }));
    }, []);

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
