import { useMemo, useState, useCallback } from 'react';

export const useTableFilters = (orderData, columnDefinitions, type) => {
    const initialVisibleColumns = {
        ord_num: true,
        ord_amount: true,
        advance_amount: true,
        order_date: true,
        cust_name: type === 'agent' || type === 'dirigent',
        agent_name: type === 'customer' || type === 'dirigent',
        commission: type === 'customer' || type === 'dirigent'
    };

    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [search, setSearch] = useState('');
    const [visibleColumns, setVisibleColumns] = useState(initialVisibleColumns);

    const processedData = useMemo(() => {
        return orderData.map(item => {
            const date = item.ord_date ? item.ord_date.split('T')[0] : 'N/A';
            return {
                ...item,
                order_date: date
            };
        });
    }, [orderData]);

    const filteredData = useMemo(() => {
        let sortableItems = [...processedData];
        if (sortConfig.key) {
            sortableItems.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];

                if (columnDefinitions[sortConfig.key].type === 'number') {
                    return sortConfig.direction === 'ascending'
                        ? (parseFloat(aValue) || 0) - (parseFloat(bValue) || 0)
                        : (parseFloat(bValue) || 0) - (parseFloat(aValue) || 0);
                } else {
                    const aStr = aValue?.toString().toLowerCase() || '';
                    const bStr = bValue?.toString().toLowerCase() || '';
                    return sortConfig.direction === 'ascending'
                        ? aStr.localeCompare(bStr)
                        : bStr.localeCompare(aStr);
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

    const handleSort = useCallback((key) => {
        setSortConfig(prevConfig => ({
            key,
            direction: prevConfig.key === key && prevConfig.direction === 'ascending' ? 'descending' : 'ascending'
        }));
    }, []);

    const handleColumnVisibilityChange = useCallback((column) => {
        setVisibleColumns(prevVisibleColumns => ({
            ...prevVisibleColumns,
            [column]: !prevVisibleColumns[column]
        }));
    }, []);

    return {
        search,
        setSearch,
        sortConfig,
        setSortConfig,
        visibleColumns,
        setVisibleColumns,
        handleSort,
        handleColumnVisibilityChange,
        filteredData
    };
};
