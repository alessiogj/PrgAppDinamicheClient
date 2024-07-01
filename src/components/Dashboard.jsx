// src/Dashboard.js
import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import { getOrders } from './Services/OrderService';
import Navbar from './Common/Navbar';
import ManageOrders from './ManageOrders';
import Statistics from './Statistics';
import '../styles/Dashboard.css';
import { parseISO, format } from 'date-fns';

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
                console.log('Data fetched:', data);
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

    const transformDataForChart = (orders) => {
        return orders.map(order => {
            const parsedDate = parseISO(order.ord_date);
            return {
                ord_date: isNaN(parsedDate) ? 'Invalid Date' : format(parsedDate, 'MM/dd/yyyy'),
                ord_amount: parseFloat(order.ord_amount),
                advance_amount: parseFloat(order.advance_amount),
                outstanding_amt: parseFloat(order.outstanding_amt),
            };
        });
    };

    const chartData = transformDataForChart(tableData);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const handleUpdate = async () => {
        setLoading(true);
        await fetchData(userRole);
    };

    return (
        <div className="App">
            <Navbar />
            <header className="App-header">
                <h1>Welcome to Your Dashboard</h1>
                <p>
                    Welcome to your dashboard. Here you can manage your orders.
                </p>
                <div className="dashboard-content">
                    <Statistics chartData={chartData} />
                </div>
                <div className="dashboard-content">
                    <ManageOrders
                        tableData={tableData}
                        userRole={userRole}
                        userCode={userCode}
                        onUpdate={handleUpdate}
                    />
                </div>
            </header>
        </div>
    );
}

export default Dashboard;
