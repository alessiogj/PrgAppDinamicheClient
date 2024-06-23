// src/components/TableWithSearch.jsx
import React, { useState, useMemo } from 'react';

const data = [
    { id: 1, name: 'Product 1', category: 'Category A' },
    { id: 2, name: 'Product 2', category: 'Category B' },
    { id: 3, name: 'Product 3', category: 'Category C' },
    // Add more data as needed
];

function TableWithSearch() {
    const [search, setSearch] = useState('');

    const filteredData = useMemo(() => {
        return data.filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.category.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    return (
        <div style={styles.container}>
            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={styles.input}
                aria-label="Search"
            />
            <table style={styles.table}>
                <thead>
                <tr>
                    <th style={styles.th}>ID</th>
                    <th style={styles.th}>Name</th>
                    <th style={styles.th}>Category</th>
                </tr>
                </thead>
                <tbody>
                {filteredData.map(item => (
                    <tr key={item.id}>
                        <td style={styles.td}>{item.id}</td>
                        <td style={styles.td}>{item.name}</td>
                        <td style={styles.td}>{item.category}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    input: {
        marginBottom: '10px',
        padding: '8px',
        width: '100%',
        boxSizing: 'border-box',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    th: {
        borderBottom: '2px solid #ddd',
        padding: '10px',
        textAlign: 'left',
    },
    td: {
        borderBottom: '1px solid #ddd',
        padding: '10px',
    },
};

export default TableWithSearch;
