import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getOrders } from './Services/OrderService';
import Navbar from './Common/Navbar';
import TableWithSearch from './Common/TableWithSearch';
import '../styles/Dashboard.css';

function Dashboard() {
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [userCode, setUserCode] = useState(null);
    const token = localStorage.getItem('jwtToken');

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserRole(decodedToken.userRole.trim());
                setUserCode(decodedToken.userCode.trim());
                fetchData(decodedToken.userRole.trim());
            } catch (error) {
                console.error("JWT decode error:", error);
                setError('Error decoding token');
                setLoading(false);
            }
        } else {
            setError('No token found');
            setLoading(false);
        }
    }, [token]);

    const fetchData = async (role) => {
        if (!role) return;

        try {
            const data = await getOrders(token, role);
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
                    </div>
                    <div className="widget">
                        <h2>Quick Links</h2>
                        <p>Provide links to frequently used features or pages.</p>
                    </div>
                    <div className="widget">
                        <h2>Manage Orders</h2>
                        <TableWithSearch
                            initialData={tableData}
                            type={userRole}
                            userCode={userCode}
                        />
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Dashboard;
