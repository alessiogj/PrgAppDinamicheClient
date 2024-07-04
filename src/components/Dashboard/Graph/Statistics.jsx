// src/Common/Statistics.js
import React from 'react';
import OrderChart from './OrderChart';

const Statistics = ({ chartData }) => {
    return (
        <div className="widget">
            <h2>Statistiche</h2>
            <OrderChart data={chartData} />
        </div>
    );
};

export default Statistics;
