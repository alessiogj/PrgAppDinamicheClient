// src/components/Dashboard.jsx
import React from 'react';
import '../styles/App.css';
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
                        <TableWithSearch /> {/* Table component with search functionality */}
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Dashboard;
