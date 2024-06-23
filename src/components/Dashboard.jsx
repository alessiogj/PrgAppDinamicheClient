import React from 'react';
import '../styles/Dashboard.css';
import Navbar from './Common/Navbar';
import TableWithSearch from './Common/TableWithSearch';
import SimpleChart from './Common/SimpleChart';

const chartData = [
    { name: 'Jan', uv: 400, pv: 2400, amt: 2400 },
    { name: 'Feb', uv: 300, pv: 1398, amt: 2210 },
    { name: 'Mar', uv: 200, pv: 9800, amt: 2290 },
    { name: 'Apr', uv: 278, pv: 3908, amt: 2000 },
    { name: 'May', uv: 189, pv: 4800, amt: 2181 },
    { name: 'Jun', uv: 239, pv: 3800, amt: 2500 },
    { name: 'Jul', uv: 349, pv: 4300, amt: 2100 },
];

const tableData = [
    {
        ORD_NUM: 100001,
        ORD_AMOUNT: 5000.00,
        ADVANCE_AMOUNT: 1000.00,
        ORD_DATE: '2024-06-01',
        CUST_CODE: 'C0001',
        AGENT_CODE: 'A0001',
        ORD_DESCRIPTION: 'Order description 1'
    },
    {
        ORD_NUM: 100002,
        ORD_AMOUNT: 3000.00,
        ADVANCE_AMOUNT: 500.00,
        ORD_DATE: '2024-06-15',
        CUST_CODE: 'C0002',
        AGENT_CODE: 'A0002',
        ORD_DESCRIPTION: 'Order description 2'
    },
    {
        ORD_NUM: 100003,
        ORD_AMOUNT: 7000.00,
        ADVANCE_AMOUNT: 1500.00,
        ORD_DATE: '2024-06-20',
        CUST_CODE: 'C0001',
        AGENT_CODE: 'A0001',
        ORD_DESCRIPTION: 'Order description 3'
    }
];

function Dashboard() {
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
                        <h2>Statistics</h2>
                        <SimpleChart data={chartData} /> {/* Chart component to display statistics */}
                    </div>
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
                        <TableWithSearch initialData={tableData} /> {/* Pass initial data to the table */}
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Dashboard;
