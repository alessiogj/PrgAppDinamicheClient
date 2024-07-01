// src/Common/Statistics.js
import React from 'react';
import OrderChart from './Common/OrderChart';

const Statistics = ({ chartData }) => {
    return (
        <div className="widget">
            <h2>Stats</h2>
            <OrderChart data={chartData} />
        </div>
    );
};

export default Statistics;
