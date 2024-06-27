import React, { useState, useEffect } from 'react';
import Navbar from './Common/Navbar';
import SimpleChart from './Common/SimpleChart';
import TableWithSearch from './Common/TableWithSearch';
import { getOrders } from './Services/OrderService';
import '../styles/Dashboard.css';

function Dashboard() {
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('jwtToken');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getOrders(token);
                console.log("Fetched data:", data);
                if (data && Array.isArray(data.orders)) {
                    setTableData(data.orders);
                } else {
                    console.error("Unexpected data structure:", data);
                    setError('Data structure error');
                }
            } catch (error) {
                console.error('Failed to fetch data', error);
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [token]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="App">
            <Navbar />
            <header className="App-header">
                <h1>Welcome to Your Dashboard</h1>
                <p>
                    This is the homepage of your application where you can manage your activities and check your stats.
                </p>
                <div className="dashboard-content">
                    <div className="widget">
                        <h2>Recent Activities</h2>
                        <p>Display recent activities or notifications here.</p>
                        {/* Implement or import a component to show recent activities */}
                    </div>
                    <div className="widget">
                        <h2>Quick Links</h2>
                        <p>Provide links to frequently used features or pages.</p>
                    </div>
                    <div className="widget">
                        <h2>Manage Orders</h2>
                        {Array.isArray(tableData) && tableData.length > 0 ? (
                            <TableWithSearch initialData={tableData} type="agent" />
                        ) : (
                            <p>No data available</p>
                        )}
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Dashboard;
