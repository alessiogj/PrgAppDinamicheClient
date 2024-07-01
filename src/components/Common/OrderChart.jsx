import React from 'react';
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
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ord_date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="ord_amount" stroke="#8884d8" name="Order Amount" />
                <Line type="monotone" dataKey="advance_amount" stroke="#82ca9d" name="Advance Amount" />
                <Line type="monotone" dataKey="outstanding_amt" stroke="#ff7300" name="Outstanding Amount" />
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
