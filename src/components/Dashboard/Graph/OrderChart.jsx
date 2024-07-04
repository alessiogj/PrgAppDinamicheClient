import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const OrderChart = ({ data }) => {
    const [chartHeight, setChartHeight] = useState(400);

    useEffect(() => {
        const handleResize = () => {
            setChartHeight(window.innerHeight / 3);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <ResponsiveContainer width="100%" height={chartHeight}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ord_date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="ord_amount" stroke="#1f77b4" name="Importo Ordine" />
                <Line type="monotone" dataKey="advance_amount" stroke="#2ca02c" name="Importo Anticipato" />
                <Line type="monotone" dataKey="outstanding_amt" stroke="#d62728" name="Importo Residuo" />
            </LineChart>
        </ResponsiveContainer>
    );
};

OrderChart.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            ord_date: PropTypes.string.isRequired,
            ord_amount: PropTypes.number.isRequired,
            advance_amount: PropTypes.number,
            outstanding_amt: PropTypes.number,
        })
    ).isRequired,
};

export default OrderChart;